import { perspectives } from "@/data/perspectives";

/**
 * The three investment perspectives, set as an editorial ledger rather than
 * three feature cards.
 *
 * Each perspective is a full-width row: a numbered marker out in the same
 * marginal rail the About section uses, the title as a serif statement, and the
 * approved paragraph as its annotation. Full-width hairlines between rows do
 * the separating, so nothing needs a box, a shadow or an icon — and there are
 * no approved icons for these three ideas in any case.
 *
 * The numbering carries the progression the section is meant to communicate
 * (operator understanding, then network, then scaling partnership) without
 * adding a word of unapproved copy.
 *
 * NO SECTION HEADING OR EYEBROW: none has been supplied for this section, and
 * inventing one is out of scope. The bronze tick on the opening hairline marks
 * the section the way it does in the Hero and About.
 */
export function InvestmentPerspectives() {
  return (
    <section className="shell py-section">
      {/* Same rule vocabulary as the Hero and About. */}
      <div className="flex items-center">
        <span className="h-px w-12 bg-accent md:w-16" />
        <span className="h-px flex-1 bg-border" />
      </div>

      <ol>
        {perspectives.map((perspective) => (
          <li
            key={perspective.marker}
            className="reveal border-b border-border py-10 last:border-b-0 md:py-14"
          >
            <div className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
              {/* `lg:pt-0.5` drops the marker's cap onto the title's cap line.
                  The 2px is derived, not eyeballed: with Newsreader's
            hhea metrics (asc 1470, desc 530, cap 1340 per 2000 upem) and
            Schibsted Grotesk's (asc 2000, desc 528, cap 1440 per 2048), the
            marker's cap sits 2.82px below its line-box top and the heading's
            sits 4.6-5.3px below its own, so ~2px closes the gap at every width
            in the clamp range. Browsers vary slightly in how they derive
            half-leading, so treat it as accurate to about a pixel. */}
              <p className="eyebrow text-accent tabular-nums lg:col-span-3 lg:pt-0.5">
                {perspective.marker}
              </p>

              {/* At `lg` this holds the rail's 9 columns with the title above
                  its paragraph, matching About's grid exactly. The title and
                  paragraph only separate into their own columns at `xl`:
                  measured against the real Newsreader advances, a 4-of-12
                  title column strands a single word ("...runs / deep") at
                  1024px but holds every title on one line from 1280px up. */}
              <div className="lg:col-span-9 lg:col-start-4 xl:grid xl:grid-cols-9 xl:gap-x-8">
                <h2 className="text-title xl:col-span-4">{perspective.title}</h2>
                <p className="mt-4 max-w-measure text-base text-foreground-muted xl:col-span-5 xl:mt-0">
                  {perspective.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
