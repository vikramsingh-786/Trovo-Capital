import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[calc(100svh_-_var(--spacing-header))] items-center">
      <div className="glow absolute inset-0 -z-10" />
      <div className="grain absolute inset-0 -z-10" />

      <div className="shell py-section">
        <div className="section-rule" />

        <p className="eyebrow mt-10 text-[1rem]! text-accent">Error 404</p>

        <h1 className="mt-8 max-w-[16ch] text-display-lg">
          This page doesn’t exist
        </h1>

        <p className="mt-8 max-w-measure text-lead text-foreground-secondary">
          The page you’re looking for may have been moved, or the link may be
          incorrect.
        </p>

        <p className="mt-10 md:mt-12">
          <Link
            href="/"
            data-magnetic="26"
            className="group relative inline-block font-sans text-title transition-colors duration-base ease-editorial hover:text-accent"
          >
            Return to Black Lane Capital
            <span className="absolute -bottom-2 left-0 h-px w-full bg-border-strong transition-colors duration-base ease-editorial group-hover:bg-accent" />
          </Link>
        </p>
      </div>
    </main>
  );
}
