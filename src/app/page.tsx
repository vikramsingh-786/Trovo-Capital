import Link from "next/link";

/* PLACEHOLDER PAGE — the real homepage sections are built in later phases.
   For now it only confirms the token layer renders and links to the internal
   design-system reference. */
export default function Home() {
  return (
    <main className="shell flex min-h-screen flex-col justify-center py-section">
      <p className="eyebrow text-accent">Placeholder</p>
      <h1 className="mt-5 text-display-lg">Trove Capital Partners</h1>
      <p className="mt-6 max-w-measure text-lead text-foreground-secondary">
        Design system in place. Homepage sections are not built yet.
      </p>
      <p className="mt-8">
        <Link
          href="/styleguide"
          className="text-accent underline decoration-from-font underline-offset-4 transition-colors duration-swift ease-editorial hover:text-foreground"
        >
          View the design system
        </Link>
      </p>
    </main>
  );
}
