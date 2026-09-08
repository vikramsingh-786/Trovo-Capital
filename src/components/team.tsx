import Image from "next/image";

import { teamMembers } from "@/data/team";

/**
 * Team.
 *
 * Three columns of cards, two rows deep for the six entries. Each card puts a
 * small square portrait BESIDE the name rather than a large one above it, with
 * the biography running the full card width underneath — an arrangement the
 * owner asked for by reference.
 *
 * Why it suits this content better than the portrait grid it replaced: the
 * biographies are long and vary a lot in length, and stacked beneath a tall
 * photograph in a three-up grid they left the section enormously tall with
 * ragged bottoms. Beside a compact tile the photograph stops competing with
 * the text, and the credential sits at eye level with the face.
 *
 * The credential still carries the brightest ink in the card, directly under a
 * muted role — the owner's stated requirement is to "highlight each of their
 * startup experience along with the image".
 *
 * PORTRAITS ARE DESATURATED AT REST (`media-plate`) and recover their colour
 * on hover. The supplied frames are bright daylight photographs each shot
 * against a different background; at tile size that clashes far less than it
 * did at full width, but greyscale is still what makes six frames read as one
 * set. It is one class to drop if the owner wants them in full colour.
 *
 * Two entries are unfilled. Their `image` is absent, so they render a tinted
 * plate rather than a photograph — no stock portrait, and no monogram either,
 * because the initial of the literal string "Team Member" carries no meaning.
 * Their name, role and experience are self-labelling placeholders held in
 * src/data/team.ts, which also records how each photograph was matched to a
 * person, since three of the files arrived under generic names.
 *
 * Copy: "Team" is the approved navigation label and "Meet the team" the
 * approved section label. Nothing else here is copy.
 */
export function Team() {
  return (
    <section id="team" className="shell py-section">
      <div className="section-rule" />

      <div className="mt-12 md:mt-16">
        <p className="eyebrow text-accent">Team</p>
        <h2 className="mt-8 text-display-lg">Meet the team</h2>
      </div>

      <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <li
            // Index-suffixed: the unfilled entries are both the literal string
            // "Team Member", so the name alone is not unique and React warns
            // about duplicate keys. The array is a static constant that is
            // never filtered or reordered, so the index is stable.
            key={`${member.name}-${index}`}
            // `reveal` and the card treatment can share this element because
            // nothing here sets `overflow`: `reveal` uses
            // `animation-timeline: view()`, which resolves against the nearest
            // scroll container, and an overflow here would become one. The
            // clip lives on the portrait tile instead.
            className="reveal group rounded-card border border-border bg-linear-to-b from-surface to-surface-raised p-6 transition-colors duration-base ease-editorial hover:border-border-strong"
          >
            {/* Portrait and identity share the head of the card. `items-start`
                so the name aligns to the top of the tile rather than to its
                centre, which would drift as the role and credential wrap.

                Tile and gap are sized for the THREE-column layout: at 1440 a
                card is about 400px wide, so a 112px tile plus a 24px gap left
                too little for a name like "Sagar Vimal Tiwari" beside it. */}
            <div className="flex items-start gap-4 md:gap-5">
              <div className="grain relative size-20 shrink-0 overflow-hidden rounded-media border border-border bg-surface md:size-24">
                {member.image ? (
                  <Image
                    src={member.image.src}
                    alt={member.name}
                    width={member.image.width}
                    height={member.image.height}
                    sizes="6rem"
                    className="media-plate size-full object-cover"
                  />
                ) : (
                  /* Awaiting a photograph. A tinted plate carrying the bronze
                     bloom the rest of the page uses, so the cell reads as
                     unfinished rather than broken. */
                  <div className="glow size-full bg-linear-to-b from-surface-raised to-surface" />
                )}
              </div>

              <div className="min-w-0">
                {/* `text-title-sm`, not `text-title`: the longest name is 18
                    characters and at title size it did not fit the column
                    beside the tile. */}
                <h3 className="font-display text-title-sm">{member.name}</h3>

                {member.role && (
                  <p className="mt-3 text-base text-foreground-muted">
                    {member.role}
                  </p>
                )}

                {/* The credential the owner asked to lead with, so it takes
                    the brightest ink and sits directly under the role. */}
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
