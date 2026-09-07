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
      <div className="shell py-section">
        <div className="flex items-center">
          <span className="h-px w-12 bg-accent md:w-16" />
          <span className="h-px flex-1 bg-border" />
        </div>

        <h2 className="reveal mt-10 max-w-[22ch] text-display-lg md:mt-14">
          Building a company ready to scale?
        </h2>

        <p className="reveal mt-6 max-w-measure text-lead text-foreground-secondary">
          Connect with Trove Capital Partners.
        </p>

        <p className="reveal mt-10 md:mt-12">
          <a
            href={`mailto:${EMAIL}`}
            className="font-sans text-title text-foreground underline decoration-from-font underline-offset-[0.3em] transition-colors duration-swift ease-editorial hover:text-accent"
          >
            {EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
