const EMAIL = "trovecapital@partners.co";

/**
 * Closing call to action.
 *
 * Carries `id="contact"`, which is what the navigation's Contact link points
 * at, so this replaces the scaffold that stood there.
 *
 * Set on the `surface` tint rather than the page ground: the tonal step exists
 * precisely so a band can read as an event, and it lets the closing section
 * land without a dark inversion or a boxed panel. The email is the interaction
 * — a plain mailto, set large enough to be the thing you reach for, with no
 * button and no invented supporting copy around it.
 *
 * All three strings are owner-approved and exact.
 */
export function FinalCta() {
  return (
    <section id="contact" className="bg-surface">
      <div className="shell py-section-tight md:py-section">
        <div className="flex items-center">
          <span className="h-px w-12 bg-accent md:w-16 lg:w-20" />
          <span className="h-px flex-1 bg-border" />
        </div>

        <h2 className="reveal mt-12 max-w-[22ch] text-display-lg font-display md:mt-14 lg:mt-16">
          Building a company ready to scale?
        </h2>

        <p className="reveal mt-8 max-w-measure text-lead text-foreground-secondary md:mt-10">
          Connect with Trove Capital Partners.
        </p>

        <p className="reveal mt-12 md:mt-14">
          <a
            href={`mailto:${EMAIL}`}
            className="font-sans text-title text-foreground underline decoration-from-font underline-offset-[0.3em] transition-colors duration-base ease-editorial hover:text-accent"
          >
            {EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
