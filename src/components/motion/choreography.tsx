"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The site's motion layer.
 *
 * ONE client component, mounted once, that wires every animation on the page by
 * querying data attributes. The alternative — a `<Reveal>`/`<TiltCard>` wrapper
 * around each animated element — would have pushed a client boundary into every
 * section and forced a wrapper <div> into grids and lists that are laid out by
 * their own children. Here the markup stays exactly as the server rendered it,
 * and only this file ships as client JS.
 *
 * The contract is the data attributes below. Anything the server renders opts
 * in by adding one; nothing else needs to know GSAP exists.
 *
 *   data-reveal            entrance on scroll. Optional value "left" | "right"
 *                          | "scale" picks the variant; default is a rise.
 *   data-reveal-group      stagger this element's [data-reveal] descendants as
 *                          one batch instead of triggering each independently.
 *   data-tilt              3D pointer tilt with a glare. Pointer devices only.
 *   data-tilt-layer        lifts off its tilting parent by translateZ. Value is
 *                          the depth in px; default 60.
 *   data-tilt-glare        the highlight element inside a [data-tilt] card.
 *   data-magnetic          pulls toward the cursor on approach. Value is the
 *                          strength in px; default 18.
 *   data-parallax          drifts on scroll. Value is the travel in percent of
 *                          the element's own height; default 18.
 *
 * IMPORTANT: [data-reveal], [data-reveal-group], [data-parallax] and
 * [data-magnetic] are collected once on mount and must not be pointed at
 * markup React re-renders — their entrances are one-shot and a replaced node
 * would be stranded in its pre-animation state.
 *
 * [data-tilt] is the exception: its binding is idempotent and is re-run on
 * LAYOUT_EVENT, so the portfolio's filtered cards keep their tilt across a
 * remount. See `bindAllTilts` below.
 *
 * Every entrance is `fromTo`, never `from`. globals.css pre-hides
 * `[data-reveal]` to stop a flash before hydration, and `gsap.from()` reads the
 * element's *current* value as its destination — so it would have dutifully
 * animated opacity 0 to opacity 0. The end state has to be stated.
 */

const HIDDEN = { rise: 42, slide: 64, scale: 0.94 } as const;

type RevealVariant = "left" | "right" | "scale" | "rise";

/* NO `clearProps` HERE, deliberately. Clearing opacity would strip the inline
   `opacity: 1` this tween lands on, handing the element straight back to the
   `[data-anim="on"] [data-reveal]` rule below — which hides it again the
   instant it finishes arriving. Clearing transform is no safer on the tilt
   cards: it would also wipe the `transformPerspective` GSAP set on mount, so
   the first hover would rotate them flat. The inline styles stay. */
const SHOWN: gsap.TweenVars = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  duration: 1.1,
  ease: "power3.out",
};

function hiddenState(variant: RevealVariant): gsap.TweenVars {
  switch (variant) {
    case "left":
      return { opacity: 0, x: -HIDDEN.slide };
    case "right":
      return { opacity: 0, x: HIDDEN.slide };
    case "scale":
      return { opacity: 0, scale: HIDDEN.scale, y: HIDDEN.rise / 2 };
    default:
      return { opacity: 0, y: HIDDEN.rise };
  }
}

function variantOf(el: Element): RevealVariant {
  const raw = el.getAttribute("data-reveal");
  return raw === "left" || raw === "right" || raw === "scale" ? raw : "rise";
}

/** Any component that changes the height of the document must dispatch this, or
 *  every ScrollTrigger below it keeps start positions measured against the old
 *  layout. ScrollTrigger's `autoRefreshEvents` covers resize and load but has
 *  no ResizeObserver on content, so a React state change fires nothing. */
export const LAYOUT_EVENT = "trove:layoutchange";

export function Choreography() {
  useGSAP(() => {
    const cleanups: Array<() => void> = [];

    /* --- Entrances -----------------------------------------------------
       Grouped elements share one trigger and stagger, so a row of cards
       deals in sequence instead of each firing at its own scroll position. */
    const grouped = new Set<Element>();

    gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", group);
      if (!items.length) return;

      const byVariant = new Map<RevealVariant, HTMLElement[]>();
      // Position in the whole group, not in the per-variant list. A group that
      // alternates direction (founder reviews) would otherwise restart the
      // stagger inside each list and deal its items out in simultaneous pairs
      // instead of one at a time.
      const order = new Map<HTMLElement, number>();

      items.forEach((item, index) => {
        grouped.add(item);
        order.set(item, index);
        const key = variantOf(item);
        const list = byVariant.get(key);
        if (list) list.push(item);
        else byVariant.set(key, [item]);
      });

      // One tween per variant, so a group can mix directions on one trigger.
      byVariant.forEach((list, variant) => {
        gsap.fromTo(list, hiddenState(variant), {
          ...SHOWN,
          delay: (i, target: HTMLElement) => (order.get(target) ?? i) * 0.11,
          scrollTrigger: { trigger: group, start: "top 82%" },
        });
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      if (grouped.has(el)) return;
      gsap.fromTo(el, hiddenState(variantOf(el)), {
        ...SHOWN,
        scrollTrigger: { trigger: el, start: "top 86%" },
      });
    });

    /* --- Scroll parallax ------------------------------------------------
       `invalidateOnRefresh` recomputes from the element's live height after a
       resize rather than reusing what was measured on mount. */
    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
      const travel = Number(el.dataset.parallax) || 18;
      gsap.fromTo(
        el,
        { yPercent: -travel / 2 },
        {
          yPercent: travel / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    /* --- Pointer-driven effects ----------------------------------------
       Skipped entirely on touch: there is no "leave" on a touchscreen, so a
       card would stay frozen at whatever angle the last tap produced. */
    const pointerFine = window.matchMedia("(pointer: fine)").matches;

    /* Wiring one card, idempotently. This has to be re-runnable rather than a
       one-shot pass over the document: the portfolio grid remounts every card
       when its category filter changes, so the nodes bound at mount are gone
       and their replacements carry no listeners. Without a rebind the tilt
       works until the first filter click and then silently stops.

       The map doubles as the "already wired" record and the teardown registry,
       keyed on the node so nothing is written into the DOM. It holds its keys
       strongly, so `bindAllTilts` prunes detached ones rather than letting
       every card the filter discards accumulate for the life of the page. */
    const tiltTeardowns = new Map<HTMLElement, () => void>();
    cleanups.push(() => {
      tiltTeardowns.forEach((teardown) => teardown());
      tiltTeardowns.clear();
    });

    const bindTilt = (card: HTMLElement) => {
      if (tiltTeardowns.has(card)) return;

      const layers = gsap.utils.toArray<HTMLElement>(
        "[data-tilt-layer]",
        card,
      );
      const glare = card.querySelector<HTMLElement>("[data-tilt-glare]");

      gsap.set(card, { transformPerspective: 1000 });

      // quickTo reuses one tween per property instead of allocating a new
      // one on every pointermove.
      const rotX = gsap.quickTo(card, "rotationX", {
        duration: 0.7,
        ease: "power3",
      });
      const rotY = gsap.quickTo(card, "rotationY", {
        duration: 0.7,
        ease: "power3",
      });

      // Measured on enter and reused, NOT read per move. Once the card is
      // rotating, getBoundingClientRect() returns the axis-aligned box of the
      // *rotated* element — which grows and shifts as the tilt increases, so
      // reading it each frame feeds the animation back into its own input and
      // makes the response damp and jitter near the edges. It is also a
      // forced synchronous layout interleaved with GSAP's transform writes.
      let rect = card.getBoundingClientRect();

      const onMove = (event: PointerEvent) => {
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        rotY(px * 15);
        rotX(-py * 15);

        if (glare) {
          gsap.to(glare, {
            duration: 0.7,
            ease: "power3",
            opacity: 0.25,
            // Tracks the pointer so the highlight reads as a light source
            // rather than a fixed sheen.
            "--glare-x": `${(px + 0.5) * 100}%`,
            "--glare-y": `${(py + 0.5) * 100}%`,
          });
        }
      };

      const onEnter = () => {
        // Re-measured here and only here. On enter the card is still at rest,
        // so this is the one moment its box is the untransformed box; it also
        // picks up any scroll or resize since mount without costing a layout
        // read per frame.
        rect = card.getBoundingClientRect();

        // A card may legitimately want the rotation and the glare without any
        // lifted layers — the about section's plate is exactly that. GSAP warns
        // "target not found" on an empty target rather than no-opping, so the
        // emptiness has to be checked here.
        if (layers.length) {
          gsap.to(layers, {
            z: (_i, el: HTMLElement) => Number(el.dataset.tiltLayer) || 60,
            duration: 0.7,
            ease: "power3.out",
          });
        }
      };

      const onLeave = () => {
        rotX(0);
        rotY(0);
        if (layers.length) {
          gsap.to(layers, { z: 0, duration: 0.9, ease: "power3.out" });
        }
        if (glare) gsap.to(glare, { opacity: 0, duration: 0.5 });
      };

      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);

      tiltTeardowns.set(card, () => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    };

    const bindAllTilts = () => {
      // Detached cards are dropped without being torn down: their listeners
      // went with the nodes, and holding the entry would pin both the node and
      // its captured measurements.
      tiltTeardowns.forEach((_teardown, card) => {
        if (!card.isConnected) tiltTeardowns.delete(card);
      });

      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach(bindTilt);
    };

    if (pointerFine) {
      bindAllTilts();

      /* Magnetic pull. Bound to the window rather than the element so the
         pull starts before the cursor arrives — the effect is the approach,
         not the hover. */
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
        const strength = Number(el.dataset.magnetic) || 18;
        const xTo = gsap.quickTo(el, "x", {
          duration: 0.9,
          ease: "elastic.out(1, 0.4)",
        });
        const yTo = gsap.quickTo(el, "y", {
          duration: 0.9,
          ease: "elastic.out(1, 0.4)",
        });

        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          const radius = Math.max(rect.width, rect.height) * 1.1;
          const distance = Math.hypot(dx, dy);

          if (distance > radius) {
            xTo(0);
            yTo(0);
            return;
          }

          // Falls off toward the edge of the radius, so the pull is strongest
          // dead centre and releases smoothly rather than snapping.
          const pull = (1 - distance / radius) * 2;
          xTo((dx / radius) * strength * pull);
          yTo((dy / radius) * strength * pull);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        cleanups.push(() => window.removeEventListener("pointermove", onMove));
      });
    }

    /* Claims the hidden state armed by the pre-paint script. Until this runs,
       that flag is on a timer and removes itself — see theme-provider.tsx. */
    document.documentElement.setAttribute("data-anim-ready", "");

    /* Filtering the portfolio removes over a thousand pixels of document
       height, which strands every trigger below it at a position the page no
       longer reaches — and it replaces the card nodes, so the new ones need
       their tilt wired. `bindTilt` skips anything already bound, so this only
       ever picks up the cards the filter just brought in. */
    const onLayoutChange = () => {
      ScrollTrigger.refresh();
      if (pointerFine) bindAllTilts();
    };
    window.addEventListener(LAYOUT_EVENT, onLayoutChange);
    cleanups.push(() =>
      window.removeEventListener(LAYOUT_EVENT, onLayoutChange),
    );

    /* Fonts land after first layout and change every measured height, so any
       trigger position computed before they swap is stale. Guarded on the
       context still being live: in StrictMode's dev double-invoke this
       promise resolves after the first pass has already been reverted. */
    let live = true;
    cleanups.push(() => {
      live = false;
    });
    document.fonts?.ready.then(() => {
      if (live) ScrollTrigger.refresh();
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
