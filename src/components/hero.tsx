/**
 * Hero.
 *
 * The only approved copy is the headline — the brand name is already carried by
 * the masthead directly above, so repeating it here would be redundant rather
 * than confident. Composition does the rest of the work: a tall ivory field, a
 * single hairline broken by a short bronze tick, and the headline anchored low.
 * The logic is a magazine cover: masthead at the top, title at the foot, empty
 * paper between them.
 *
 * The headline aligns to the same `shell` gutter as the wordmark above it, so
 * the two share one left edge all the way up the page.
 *
 * Deliberately NOT a centred headline + paragraph + two buttons. There is no
 * supporting paragraph because no supporting copy has been supplied, and
 * inventing one is out of the question.
 */
export function Hero() {
  return (
    <section className="shell flex min-h-[calc(100svh-var(--spacing-header))] flex-col justify-end pt-section-tight pb-section 2xl:min-h-[calc(100svh-var(--spacing-header)+2rem)]">
      {/* One hairline, with the accent carrying only its first few centimetres.
          This is the site's rule vocabulary in its simplest form. */}
      <div className="animate-rise flex items-center [animation-delay:80ms]">
        <span className="h-px w-12 bg-accent md:w-16 lg:w-20" />
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* From `md` up the two clauses are set as their own lines, because left
          to itself the browser balances to "Capital for what / comes next.",
          which splits "what" off from "comes next.". Measured against the real
          Newsreader metrics, the second line fits on one line at every width
          from 768px (433px of 714px) to 1920px (728px of 1256px).

          Below `md` the spans stay inline and wrap naturally — forcing the
          break there would overflow. The `ch` measure still governs that
          range: it binds between roughly 600px and 767px, and scales with the
          type so the line count stays stable rather than collapsing to one
          long line. */}
      <h1 className="animate-rise mt-10 max-w-[16ch] text-display-xl [animation-delay:180ms] md:mt-12 lg:mt-14">
        <span className="md:block">Capital for </span>
        <span className="md:block">what comes next.</span>
      </h1>
    </section>
  );
}
