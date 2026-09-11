"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HIDDEN = { rise: 42, slide: 64, scale: 0.94 } as const;

type RevealVariant = "left" | "right" | "scale" | "rise";

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

export const LAYOUT_EVENT = "trove:layoutchange";

export function Choreography() {
  useGSAP(() => {
    const cleanups: Array<() => void> = [];

    const grouped = new Set<Element>();

    gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", group);
      if (!items.length) return;

      const byVariant = new Map<RevealVariant, HTMLElement[]>();
      const order = new Map<HTMLElement, number>();

      items.forEach((item, index) => {
        grouped.add(item);
        order.set(item, index);
        const key = variantOf(item);
        const list = byVariant.get(key);
        if (list) list.push(item);
        else byVariant.set(key, [item]);
      });

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

    const pointerFine = window.matchMedia("(pointer: fine)").matches;

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

      const rotX = gsap.quickTo(card, "rotationX", {
        duration: 0.7,
        ease: "power3",
      });
      const rotY = gsap.quickTo(card, "rotationY", {
        duration: 0.7,
        ease: "power3",
      });

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
            "--glare-x": `${(px + 0.5) * 100}%`,
            "--glare-y": `${(py + 0.5) * 100}%`,
          });
        }
      };

      const onEnter = () => {
        rect = card.getBoundingClientRect();

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
      tiltTeardowns.forEach((_teardown, card) => {
        if (!card.isConnected) tiltTeardowns.delete(card);
      });

      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach(bindTilt);
    };

    if (pointerFine) {
      bindAllTilts();

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

          const pull = (1 - distance / radius) * 2;
          xTo((dx / radius) * strength * pull);
          yTo((dy / radius) * strength * pull);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        cleanups.push(() => window.removeEventListener("pointermove", onMove));
      });
    }

    document.documentElement.setAttribute("data-anim-ready", "");

    const onLayoutChange = () => {
      ScrollTrigger.refresh();
      if (pointerFine) bindAllTilts();
    };
    window.addEventListener(LAYOUT_EVENT, onLayoutChange);
    cleanups.push(() =>
      window.removeEventListener(LAYOUT_EVENT, onLayoutChange),
    );

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
