import Image from "next/image";

import { teamMembers } from "@/data/team";

/**
 * Team.
 *
 * A partners roster rather than an employee directory: a ruled grid where each
 * person occupies their own cell, opened by a hairline, with the name set in
 * the editorial serif and their operator credential given the darkest ink
 * beneath it — so once the real experience arrives it reads as the point of
 * the section rather than as metadata.
 *
 * Only five names have been supplied, so today each cell renders a rule and a
 * name and nothing else. That is deliberate: no invented roles, no
 * placeholder biographies, no stand-in portraits. Every other field is
 * conditional, so the composition fills out rather than changes when the
 * content lands.
 *
 * Copy: "Team" is the approved navigation label and "Meet the team" the
 * approved section label ("MEET THE TEAM" in the supplied document, which the
 * eyebrow renders uppercase). Nothing else here is copy.
 */
export function Team() {
  return (
    <section id="team" className="shell py-section">
      <div className="flex items-center">
        <span className="h-px w-12 bg-accent md:w-16" />
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-6 md:mt-14 md:grid-cols-12 md:gap-y-0">
        <p className="eyebrow text-accent md:col-span-3 md:pt-0.5">Team</p>
        <h2 className="text-display-md md:col-span-9 md:col-start-4">
          Meet the team
        </h2>
      </div>

      <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-y-16">
        {teamMembers.map((member) => (
          <li key={member.name} className="reveal border-t border-border pt-8">
            {member.image && (
              <Image
                src={member.image.src}
                alt={member.name}
                width={member.image.width}
                height={member.image.height}
                className="mb-7 aspect-4/5 w-full rounded-media border border-border bg-surface object-cover"
              />
            )}

            <h3 className="text-display-sm font-display">{member.name}</h3>

            {member.role && (
              <p className="eyebrow mt-4 text-foreground-muted">{member.role}</p>
            )}

            {/* The credential the owner asked to lead with, so it carries the
                darkest ink under the name. */}
            {member.experience && (
              <p className="mt-5 text-base text-foreground">{member.experience}</p>
            )}

            {member.description && (
              <p className="mt-4 max-w-measure text-caption text-foreground-muted">
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
