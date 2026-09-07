import type { Metadata } from "next";
import Link from "next/link";

/* TEMPORARY INTERNAL ROUTE — Phase 2 design-system reference.
   Delete this directory before deployment (Phase 18), AND the link to it in
   src/app/page.tsx. Because `typedRoutes` is on, a leftover link becomes a
   build error rather than a silent 404. It exists so the token layer can be
   reviewed visually before any real section is built. */

export const metadata: Metadata = {
  title: "Design System",
  description: "Internal design-system reference for the Trove Capital Partners website.",
  robots: { index: false, follow: false },
};

/* --- Data -----------------------------------------------------------------
   Contrast ratios are measured (WCAG 2.1 relative luminance) against
   --color-ivory-50, the page ground. AA = 4.5 for body text, 3.0 for large
   text and non-text UI, AAA = 7.0. */

type Swatch = {
  token: string;
  oklch: string;
  hex: string;
  ratio: number | null;
  use: string;
};

const surfaces: Swatch[] = [
  { token: "--color-ivory-50", oklch: "0.982 0.006 85", hex: "#FBF9F5", ratio: null, use: "Page ground" },
  { token: "--color-ivory-100", oklch: "0.955 0.010 85", hex: "#F3F0E9", ratio: null, use: "Alternating band (1.083 vs ground)" },
  { token: "--color-ivory-200", oklch: "0.930 0.012 85", hex: "#EBE7DF", ratio: null, use: "Inset / hover fill" },
  { token: "--color-ivory-300", oklch: "0.895 0.014 85", hex: "#E1DCD2", ratio: null, use: "Hairline rules" },
];

const inks: Swatch[] = [
  { token: "--color-ink-900", oklch: "0.205 0.012 60", hex: "#1B1612", ratio: 17.03, use: "Primary text, focus ring" },
  { token: "--color-ink-800", oklch: "0.300 0.012 60", hex: "#322C28", ratio: 12.98, use: "Strong text on tint" },
  { token: "--color-ink-700", oklch: "0.400 0.011 60", hex: "#4C4642", ratio: 8.77, use: "Secondary text" },
  { token: "--color-ink-600", oklch: "0.500 0.010 60", hex: "#68625E", ratio: 5.71, use: "Muted text" },
  { token: "--color-ink-500", oklch: "0.545 0.010 60", hex: "#756F6A", ratio: 4.72, use: "Non-text on tints" },
  { token: "--color-ink-400", oklch: "0.643 0.009 60", hex: "#918C88", ratio: 3.16, use: "Borders; text on inverse (5.39)" },
];

const accents: Swatch[] = [
  { token: "--color-bronze-700", oklch: "0.470 0.075 65", hex: "#78512A", ratio: 6.6, use: "Accent text, links" },
  { token: "--color-bronze-600", oklch: "0.515 0.085 65", hex: "#895D2E", ratio: 5.46, use: "Accent on tints (4.68 on ivory-200)" },
  { token: "--color-bronze-500", oklch: "0.650 0.090 65", hex: "#B58452", ratio: 3.13, use: "Rules, selection; text on inverse (5.44)" },
];

const semantics: [string, string][] = [
  ["--color-background", "--color-ivory-50"],
  ["--color-surface", "--color-ivory-100"],
  ["--color-surface-sunken", "--color-ivory-200"],
  ["--color-foreground", "--color-ink-900"],
  ["--color-foreground-secondary", "--color-ink-700"],
  ["--color-foreground-muted", "--color-ink-600"],
  ["--color-foreground-on-tint", "--color-ink-800"],
  ["--color-border", "--color-ivory-300"],
  ["--color-border-strong", "--color-ink-400"],
  ["--color-accent", "--color-bronze-700"],
  ["--color-accent-on-tint", "--color-bronze-600"],
  ["--color-accent-quiet", "--color-bronze-500"],
  ["--color-inverse", "--color-ink-900"],
  ["--color-inverse-foreground", "--color-ivory-50"],
  ["--color-inverse-foreground-muted", "--color-ink-400"],
  ["--color-inverse-border", "--color-ink-700"],
];

const typeScale = [
  { cls: "text-display-xl", clamp: "clamp(2.75rem, 1.95rem + 4vw, 6.5rem)", serif: true, sample: "Patient capital" },
  { cls: "text-display-lg", clamp: "clamp(2.25rem, 1.7rem + 2.75vw, 4.5rem)", serif: true, sample: "Conviction over consensus" },
  { cls: "text-display-md", clamp: "clamp(2rem, 1.72rem + 1.6vw, 3.25rem)", serif: true, sample: "Building enduring companies" },
  { cls: "text-display-sm", clamp: "clamp(1.75rem, 1.5rem + 1.1vw, 2.5rem)", serif: true, sample: "Section headline" },
  { cls: "text-title", clamp: "clamp(1.375rem, 1.2rem + 0.7vw, 1.875rem)", serif: true, sample: "Subsection title" },
  { cls: "text-title-sm", clamp: "clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)", serif: false, sample: "Card heading" },
  { cls: "text-lead", clamp: "clamp(1.0625rem, 1rem + 0.35vw, 1.3125rem)", serif: false, sample: "An introductory paragraph, set slightly larger than body copy to open a section." },
  { cls: "text-base", clamp: "1.0625rem · 1.65", serif: false, sample: "Body copy. The restrained grotesque keeps long passages neutral and legible, leaving emphasis to the serif above it." },
  { cls: "text-caption", clamp: "0.8125rem", serif: false, sample: "Caption and metadata text." },
];

const spacingTokens = [
  { token: "--spacing-gutter", clamp: "clamp(1.25rem, 3.5vw, 2.75rem)", use: "Page inline padding" },
  { token: "--spacing-section-tight", clamp: "clamp(3rem, 6vw, 5.5rem)", use: "Compact section rhythm" },
  { token: "--spacing-section", clamp: "clamp(4.5rem, 9vw, 8.5rem)", use: "Standard section rhythm" },
  { token: "--spacing-header", clamp: "6rem", use: "Sticky header height + scroll-padding" },
];

const containers = [
  { token: "--container-narrow", value: "32rem", use: "Pull quotes, forms" },
  { token: "--container-measure", value: "42rem", use: "Running text" },
  { token: "--container-shell", value: "84rem", use: "Standard page frame" },
  { token: "--container-wide", value: "96rem", use: "Editorial spreads" },
];

const motion = [
  { token: "--transition-duration-swift", value: "160ms", use: "Hover, focus, small state" },
  { token: "--transition-duration-base", value: "240ms", use: "Default transition" },
  { token: "--transition-duration-slow", value: "480ms", use: "Entrances, reveals" },
];

/* --- Small in-file presentation helpers ---------------------------------- */

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  const id = title.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
  return (
    <section aria-labelledby={id} className="border-t border-border pt-10 md:pt-14">
      <div className="mb-8 flex items-baseline gap-4 md:mb-12">
        <span aria-hidden className="font-sans text-caption text-foreground-muted tabular-nums">
          {index}
        </span>
        <h2 id={id} className="text-title">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Badge({ ratio }: { ratio: number | null }) {
  if (ratio === null) {
    return <span className="text-caption text-foreground-muted">ground</span>;
  }
  const label = ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "UI only";
  return (
    <span className="text-caption text-foreground-muted tabular-nums">
      {ratio.toFixed(2)} · {label}
    </span>
  );
}

/* Swatches are data-driven, so the fill comes from an inline CSS variable
   rather than a class name Tailwind could not statically see. */
function SwatchRow({ items }: { items: Swatch[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <li key={s.token} className="flex items-start gap-4">
          <span
            aria-hidden
            className="mt-0.5 size-11 shrink-0 rounded-card border border-border"
            style={{ backgroundColor: `var(${s.token})` }}
          />
          <span className="min-w-0">
            <code className="block truncate font-mono text-caption text-foreground">
              {s.token}
            </code>
            <span className="mt-1 block text-caption text-foreground-muted">
              oklch({s.oklch}) · {s.hex}
            </span>
            <span className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <Badge ratio={s.ratio} />
              <span className="text-caption text-foreground-muted">{s.use}</span>
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function StyleguidePage() {
  return (
    <main id="main" tabIndex={-1} className="shell py-section-tight">
      <header className="mb-14 md:mb-20">
        <p className="eyebrow text-accent">Phase 2 · Internal reference</p>
        <h1 className="mt-5 text-display-lg">Design system</h1>
        <p className="mt-6 max-w-measure text-lead text-foreground-secondary">
          The token layer for the Trove Capital Partners website: typography,
          colour, spacing rhythm, containers, radii and motion. Light ivory
          editorial — warm neutrals, near-black ink, one restrained bronze
          accent.
        </p>
        <p className="mt-4 max-w-measure text-caption text-foreground-muted">
          This route is temporary and marked <code className="font-mono">noindex</code>;
          it is removed before deployment. All specimen copy is generic sample
          text, not Trove content.{" "}
          <Link
            href="/"
            className="text-accent underline decoration-from-font underline-offset-4 transition-colors duration-swift ease-editorial hover:text-foreground"
          >
            Back to index
          </Link>
        </p>
      </header>

      <div className="space-y-14 md:space-y-20">
        <Section index="01" title="Typeface pairing">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="border border-border bg-surface p-6 md:p-8">
              <p className="eyebrow text-foreground-muted">Display</p>
              <p className="mt-4 font-display text-display-sm">Newsreader</p>
              <p className="mt-3 text-caption text-foreground-muted">
                Variable · weight 200–800 · latin subset
              </p>
              <p className="mt-4 text-base text-foreground-secondary">
                An editorial serif drawn for on-screen reading. Moderate stroke
                contrast reads as considered rather than decorative, and the
                weight axis covers every heading level from one file.
              </p>
            </div>
            <div className="border border-border bg-surface p-6 md:p-8">
              <p className="eyebrow text-foreground-muted">Text &amp; UI</p>
              <p className="mt-4 font-sans text-display-sm">Schibsted Grotesk</p>
              <p className="mt-3 text-caption text-foreground-muted">
                Variable · weight 400–900 · latin subset
              </p>
              <p className="mt-4 text-base text-foreground-secondary">
                A restrained media grotesque. Neutral enough to disappear in
                long passages, with enough character to avoid the default
                interface look.
              </p>
            </div>
          </div>
        </Section>

        <Section index="02" title="Type scale">
          <dl className="space-y-9">
            {typeScale.map((t) => (
              <div key={t.cls} className="grid gap-2 lg:grid-cols-[16rem_1fr] lg:gap-8">
                <dt className="lg:pt-2">
                  <code className="font-mono text-caption text-foreground">{t.cls}</code>
                  <span className="mt-1 block font-mono text-caption text-foreground-muted">
                    {t.clamp}
                  </span>
                </dt>
                <dd className={`${t.cls} ${t.serif ? "font-display" : "font-sans"} min-w-0`}>
                  {t.sample}
                </dd>
              </div>
            ))}
            <div className="grid gap-2 lg:grid-cols-[16rem_1fr] lg:gap-8">
              <dt className="lg:pt-2">
                <code className="font-mono text-caption text-foreground">eyebrow</code>
                <span className="mt-1 block font-mono text-caption text-foreground-muted">
                  0.6875rem · 0.14em · uppercase
                </span>
              </dt>
              <dd className="eyebrow text-foreground-muted">Investment approach</dd>
            </div>
          </dl>
        </Section>

        <Section index="03" title="Colour">
          <div className="space-y-10">
            <div>
              <h3 className="eyebrow mb-5 text-foreground-muted">Surfaces</h3>
              <SwatchRow items={surfaces} />
            </div>
            <div>
              <h3 className="eyebrow mb-5 text-foreground-muted">Ink</h3>
              <SwatchRow items={inks} />
            </div>
            <div>
              <h3 className="eyebrow mb-5 text-foreground-muted">Accent</h3>
              <SwatchRow items={accents} />
            </div>
            <div>
              <h3 className="eyebrow mb-5 text-foreground-muted">Semantic aliases</h3>
              <div
                tabIndex={0}
                role="region"
                aria-label="Semantic colour tokens"
                className="overflow-x-auto"
              >
                <table className="w-full min-w-narrow border-collapse text-left">
                  <caption className="sr-only">
                    Semantic colour tokens and the raw scale step each resolves to
                  </caption>
                  <thead>
                    <tr className="border-b border-border">
                      <th scope="col" className="py-2 pr-6 font-sans text-caption font-medium text-foreground-muted">
                        Token
                      </th>
                      <th scope="col" className="py-2 font-sans text-caption font-medium text-foreground-muted">
                        Resolves to
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {semantics.map(([token, target]) => (
                      <tr key={token} className="border-b border-border/60">
                        <td className="py-2 pr-6">
                          <code className="font-mono text-caption text-foreground">{token}</code>
                        </td>
                        <td className="py-2">
                          <code className="font-mono text-caption text-foreground-muted">{target}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Section>

        <Section index="04" title="Inverted band">
          <div className="inverse-band px-6 py-14 md:px-12 md:py-20">
            <p className="eyebrow text-accent-quiet">Contrast 17.03 · AAA</p>
            <p className="mt-5 font-display text-display-sm">
              The same ink, used as ground.
            </p>
            <p className="mt-4 max-w-measure text-base text-inverse-foreground-muted">
              Reserved for a closing call to action and the footer, so the dark
              band stays an event rather than a texture.
            </p>
            <p className="mt-6">
              <Link
                href="/styleguide"
                className="text-accent-quiet underline decoration-from-font underline-offset-4 transition-colors duration-swift ease-editorial hover:text-inverse-foreground"
              >
                Tab to this link — the ring turns ivory inside the band
              </Link>
            </p>
          </div>
        </Section>

        <Section index="05" title="Spacing rhythm">
          <p className="mb-8 max-w-measure text-base text-foreground-secondary">
            Tailwind&rsquo;s 0.25rem step scale is unchanged. These three tokens
            carry the page-level rhythm so sections do not each invent their own
            padding.
          </p>
          <ul className="space-y-6">
            {spacingTokens.map((s) => (
              <li key={s.token}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <code className="font-mono text-caption text-foreground">{s.token}</code>
                  <span className="font-mono text-caption text-foreground-muted">{s.clamp}</span>
                </div>
                <div
                  aria-hidden
                  className="mt-2 h-2 bg-accent-quiet"
                  style={{ width: `var(${s.token})` }}
                />
                <p className="mt-2 text-caption text-foreground-muted">{s.use}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section index="06" title="Containers">
          <ul className="space-y-5">
            {containers.map((c) => (
              <li key={c.token}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <code className="font-mono text-caption text-foreground">{c.token}</code>
                  <span className="font-mono text-caption text-foreground-muted">
                    {c.value} · {c.use}
                  </span>
                </div>
                <div
                  aria-hidden
                  className="mt-2 h-8 max-w-full border border-border-strong bg-surface"
                  style={{ width: `var(${c.token})` }}
                />
              </li>
            ))}
          </ul>
        </Section>

        <Section index="07" title="Radii">
          <ul className="flex flex-wrap gap-8">
            {[
              { token: "--radius-card", cls: "rounded-card", value: "0.1875rem" },
              { token: "--radius-media", cls: "rounded-media", value: "0.25rem" },
              { token: "--radius-pill", cls: "rounded-pill", value: "9999px" },
            ].map((r) => (
              <li key={r.token} className="w-40">
                <div className={`h-16 border border-border-strong bg-surface ${r.cls}`} />
                <code className="mt-3 block font-mono text-caption text-foreground">{r.token}</code>
                <span className="mt-1 block font-mono text-caption text-foreground-muted">
                  {r.value}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section index="08" title="Motion">
          <p className="mb-8 max-w-measure text-base text-foreground-secondary">
            Two easings only: <code className="font-mono">--ease-editorial</code> for
            anything the reader notices, <code className="font-mono">--ease-standard</code> for
            small state changes. Hover a card below. Every transition is
            neutralised globally under{" "}
            <code className="font-mono">prefers-reduced-motion: reduce</code>.
          </p>
          <ul className="grid gap-5 sm:grid-cols-3">
            {motion.map((m) => (
              <li key={m.token}>
                <div
                  className="border border-border bg-surface p-5 transition-[background-color,transform] ease-editorial hover:-translate-y-1 hover:bg-surface-sunken"
                  style={{ transitionDuration: `var(${m.token})` }}
                >
                  <code className="font-mono text-caption text-foreground">{m.token}</code>
                  <span className="mt-1 block font-mono text-caption text-foreground-muted">
                    {m.value}
                  </span>
                  <span className="mt-3 block text-caption text-foreground-muted">{m.use}</span>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section index="09" title="Focus states">
          <p className="mb-8 max-w-measure text-base text-foreground-secondary">
            A single 2px ring in <code className="font-mono">--color-foreground</code> at
            17:1 contrast, offset by 2px, applied on{" "}
            <code className="font-mono">:focus-visible</code> only. Tab through
            these.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              className="rounded-card bg-inverse px-6 py-3 font-sans text-caption font-medium tracking-wide text-inverse-foreground uppercase transition-colors duration-swift ease-standard hover:bg-ink-800"
            >
              Primary action
            </button>
            <button
              type="button"
              className="rounded-card border border-border-strong px-6 py-3 font-sans text-caption font-medium tracking-wide uppercase transition-colors duration-swift ease-standard hover:bg-surface-sunken"
            >
              Secondary action
            </button>
            <Link
              href="/styleguide"
              className="text-accent underline decoration-from-font underline-offset-4 transition-colors duration-swift ease-editorial hover:text-foreground"
            >
              A text link
            </Link>
          </div>
        </Section>
      </div>
    </main>
  );
}
