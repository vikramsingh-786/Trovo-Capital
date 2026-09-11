import Image from "next/image";

import { pressItems } from "@/data/press";

export function Press() {
  return (
    <section className="shell py-section">
      <div className="section-rule" />

      <div className="mt-12 md:mt-16">
        <h2 className="text-display-lg">Media</h2>
      </div>

      <ul className="mt-12 grid gap-5 md:mt-16 md:gap-6 lg:grid-cols-2">
        {pressItems.map((item) => (
          <li key={item.url} className="reveal">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-card border border-border bg-linear-to-b from-surface to-surface-raised p-6 transition-colors duration-base ease-editorial hover:border-border-strong md:p-8"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.logo.src}
                  alt={item.company}
                  width={item.logo.width}
                  height={item.logo.height}
                  sizes="3rem"
                  className="size-12 shrink-0 rounded-media border border-border object-contain transition-colors duration-base ease-standard group-hover:border-border-strong"
                />

                <p className="eyebrow text-accent">{item.publication}</p>
              </div>

              <h3 className="mt-6 font-display text-title-sm leading-snug text-foreground-secondary transition-colors duration-base ease-standard group-hover:text-foreground md:mt-7">
                {item.title}
              </h3>

              <div className="mt-auto flex items-end justify-between gap-4 pt-6 md:pt-7">
                <div className="min-w-0">
                  <p className="text-caption text-foreground-muted">
                    {item.company}
                  </p>

                  {item.date && (
                    <p className="mt-1 text-caption text-foreground-faint">
                      {item.date}
                    </p>
                  )}
                </div>

                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="size-4 shrink-0 -translate-x-1 text-foreground-faint opacity-0 transition-[translate,color,opacity] duration-base ease-editorial group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100 pointer-coarse:translate-x-0 pointer-coarse:opacity-100"
                >
                  <path
                    d="M4.5 11.5L11.5 4.5M6 4.5h5.5V10"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
