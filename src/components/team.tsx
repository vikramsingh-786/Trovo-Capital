import Image from "next/image";

import { teamMembers } from "@/data/team";

export function Team() {
  return (
    <section id="team" className="shell py-section">
      <div className="section-rule" />

      <div className="mt-12 md:mt-16">
        <p className="eyebrow text-accent">Team</p>
      </div>

      <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <li
            key={member.name}
            className="reveal group rounded-card border border-border bg-linear-to-b from-surface to-surface-raised p-6 transition-colors duration-base ease-editorial hover:border-border-strong"
          >
            <div className="flex items-start gap-4 md:gap-5">
              <div className="grain relative size-20 shrink-0 overflow-hidden rounded-media border border-border bg-surface md:size-24">
                {member.image ? (
                  <Image
                    src={member.image.src}
                    alt={member.name}
                    width={member.image.width}
                    height={member.image.height}
                    sizes="6rem"
                    className="media-plate size-full object-cover object-top"
                  />
                ) : (
                  <div className="glow size-full bg-linear-to-b from-surface-raised to-surface" />
                )}
              </div>

              <div className="min-w-0">
                <h3 className="font-display text-title-sm">{member.name}</h3>

                {member.role && (
                  <p className="mt-3 text-base text-foreground-muted">
                    {member.role}
                  </p>
                )}

                {member.experience && (
                  <p className="text-base text-foreground">
                    {member.experience}
                  </p>
                )}
              </div>
            </div>

            {member.description && (
              <p className="mt-6 text-caption text-foreground-muted md:mt-7">
                {member.description}
              </p>
            )}

            {member.link && (
              <p className="mt-5">
                <a
                  href={member.link}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow text-accent underline decoration-from-font underline-offset-4 transition-colors duration-base ease-editorial hover:text-foreground"
                >
                  Profile
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
