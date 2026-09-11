"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  assignedCategories,
  portfolioCompanies,
  type PortfolioCategory,
} from "@/data/portfolio";
import { LAYOUT_EVENT } from "./motion/choreography";

const ALL = "All";

type Filter = typeof ALL | PortfolioCategory;

export function PortfolioLedger() {
  const companies = portfolioCompanies;
  const availableCategories = assignedCategories();
  const [filter, setFilter] = useState<Filter>(ALL);

  const active =
    filter !== ALL && !availableCategories.includes(filter) ? ALL : filter;

  const visible =
    active === ALL
      ? companies
      : companies.filter((company) => company.category === active);

  useEffect(() => {
    window.dispatchEvent(new Event(LAYOUT_EVENT));
  }, [active]);

  return (
    <div className="mt-14 md:mt-18">
      {availableCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2.5 border-b border-border pb-8">
          {([ALL, ...availableCategories] as Filter[]).map((category) => {
            const isActive = category === active;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`eyebrow rounded-pill border px-4 py-2.5 transition-[color,background-color,border-color,box-shadow] duration-swift ease-standard ${
                  isActive
                    ? "border-accent bg-accent text-background keycap-pressed-accent"
                    : "border-border bg-surface-raised text-foreground-muted keycap hover:border-border-strong hover:text-foreground hover:keycap-pressed"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}

      <div
        key={active}
        className="animate-fade mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
      >
        {visible.map((company) => (
          <a
            key={company.name}
            data-tilt
            href={company.url}
            target="_blank"
            rel="noreferrer"
            className="group tilt-card relative flex flex-col rounded-card border border-border bg-linear-to-b from-surface-sunken to-surface-raised p-6 transition-colors duration-base ease-editorial hover:border-border-strong md:p-7"
          >
            <span className="absolute -inset-px overflow-hidden rounded-card">
              <span className="glow absolute inset-0 opacity-0 transition-opacity duration-slow ease-editorial group-hover:opacity-100" />

              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-base ease-editorial group-hover:scale-x-100" />
            </span>

            <span data-tilt-glare className="tilt-glare rounded-card" />

            <div
              data-tilt-layer="25"
              className="relative flex items-start justify-between gap-4"
            >
              <Image
                src={company.logo.src}
                alt={company.name}
                width={company.logo.width}
                height={company.logo.height}
                className="size-14 rounded-media border border-border object-contain transition-colors duration-base ease-standard group-hover:border-border-strong"
              />

              {company.category && (
                <span className="eyebrow shrink-0 text-[0.5625rem] text-foreground-faint transition-colors duration-base ease-standard group-hover:text-accent">
                  {company.category}
                </span>
              )}
            </div>

            <div
              data-tilt-layer="55"
              className="relative mt-8 flex items-baseline justify-between gap-3 md:mt-10"
            >
              <h3 className="text-title transition-colors duration-base ease-standard group-hover:text-accent">
                {company.name}
              </h3>

              <svg
                viewBox="0 0 16 16"
                className="size-4 shrink-0 -translate-x-1 text-foreground-faint opacity-0 transition-[translate,color,opacity] duration-base ease-editorial group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100 pointer-coarse:translate-x-0 pointer-coarse:opacity-100"
                fill="none"
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

            <p
              data-tilt-layer="35"
              className="relative mt-3 text-caption text-foreground-muted"
            >
              {company.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
