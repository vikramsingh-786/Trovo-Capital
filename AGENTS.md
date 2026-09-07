<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Trove Capital Partners — project rules

Standing instructions from the project owner. They apply to EVERY task and
EVERY phase, not just the one in front of you. Content below this line is
outside Next's managed block and is preserved by `next dev`.

## 1. Goal

A premium, production-quality venture capital website for **Trove Capital
Partners**, deployed as a **static** site to Cloudflare by DevOps. The quality
bar is high.

Must feel: premium, sophisticated, modern, editorial, institutional,
technology-focused, confident, minimal.

Must NOT look: generic, template-like, AI-generated, outdated, overly corporate,
SaaS-like, unnecessarily complicated.

## 2. Use current technology

Before implementing anything involving a framework, library, API or config:
inspect the installed version, check the official docs (for Next.js: the bundled
`node_modules/next/dist/docs/`), and use patterns supported by that version.
No deprecated APIs, no old tutorials/Stack Overflow patterns, no assuming an API
still works because it did in an older version. Flag and modernize outdated code
when found. **Never downgrade a package just to make old code work.**

## 3. Right tool for the task

Do not reach for a library by reflex. Use what Next.js/React/TypeScript/Tailwind
already provide. Before adding a dependency: confirm it is actually necessary,
that the framework doesn't already cover it, that it is mature and maintained
and version-compatible, and that the bundle cost is justified. If one is needed,
state briefly why.

## 4-5. Subagent review is mandatory per phase

```
IMPLEMENT -> TEST -> SUBAGENT REVIEW -> FIX -> TEST -> PHASE COMPLETE
```

The main agent implements; a **separate** review subagent independently inspects
the ACTUAL files on disk. Compiling is not evidence of correctness. Reviewers
cover: code quality (TS correctness, React practice, component architecture,
unnecessary complexity, duplication, bad abstractions, maintainability);
Next.js (App Router patterns, server vs client components, unnecessary client
components, metadata, images, static-export compatibility); UI (responsive
behavior, layout, a11y, semantic HTML, keyboard nav, focus states, animation);
performance (unnecessary JS/deps, images, layout shift, re-renders, bundle);
security (unsafe patterns, secrets, dangerous HTML, external scripts); modernity
(deprecated APIs, outdated patterns, wrong assumptions about framework behavior).

Findings must be actionable. Fix them, re-run checks, and do not declare a phase
complete while critical issues remain. Tell the reviewer the installed versions
are newer than its training data so it does not "correct" current APIs.

## 6. Never claim something works without verifying it

Run the real checks: `npm run typecheck`, `npm run lint`, `npm run build`, plus
relevant runtime checks. Never say "everything works" unverified. If a check
cannot be run, say so explicitly. Never hide errors.

## 7. Browser / visual verification

For UI work, do not rely on source alone. If browser tooling is available,
inspect the rendered site at desktop / tablet / mobile and check navigation,
scrolling, hover states, animations, images, typography, spacing, overflow. If
it is unavailable, run the project checks and **say clearly** that visual
verification could not be automated.

## 8. Do not rewrite unnecessarily

Inspect and understand existing code first; reuse existing architecture. Do not
replace working modern code out of stylistic preference. Do improve code that is
genuinely outdated, fragile or over-complex.

## 9. Component structure

Sensible granularity — no component per scrap of markup, no one giant component.
Reusable components only where reuse is real. Keep content/data separate from
presentation: **portfolio companies, team members and founder testimonials live
in maintainable data structures** so real content can be dropped in later.

## 10. Accessibility is required

Semantic HTML, correct heading hierarchy, accessible navigation, keyboard
navigation, visible focus states, meaningful alt text, accessible buttons and
mobile menus, reduced-motion support, sufficient contrast. Never trade a11y for
a visual effect.

## 11. Responsive is required

Design intentionally for large desktop, laptop, tablet and mobile — not desktop
shrunk down. Watch horizontal overflow, type scaling, spacing, navigation, image
cropping, touch targets, readability.

## 12. Performance

Avoid unnecessary client JS, client components, dependencies, animations, large
images and third-party scripts. Use appropriate image sizing/loading. Do not
optimize prematurely at the cost of maintainability.

## 13. Static deployment

Must stay deployable as a static site to Cloudflare. `output: "export"` is on, so
no API routes, Route Handlers, Middleware, ISR, Server Actions or runtime
`cookies()`/`headers()`. Introduce nothing needing a persistent server without
explicit owner approval. See README.md for the Cloudflare specifics.

## 14. Security / secrets

Never hardcode API keys, passwords, tokens, credentials or private URLs. Env
vars go in `.env.local` (gitignored); never expose secrets in client code.

## 15. Git / change safety

Inspect `git status` before major changes if git is initialized; know what
changed; don't overwrite unrelated work. Prefer small, understandable changes.
After each phase summarize: files changed, dependencies added/removed, config
changed, checks performed, reviewer findings, issues fixed.

## 16. Error handling

Do not apply random fixes. Read the error, find the root cause, check current
official docs, make the smallest correct fix, re-run the failing check, and
confirm nothing else broke.

## 17. Do not invent information

**Never** invent founder or employee names, company claims, investment amounts,
portfolio information, testimonials, statistics, awards, logos or partnerships.
Use placeholders and label them clearly as placeholders.

## 18. Design quality

Do not settle for the first acceptable design. Think about hierarchy, typography,
whitespace, composition, visual rhythm, consistency, interaction, responsiveness.
The goal is exceptional polish, not more features.

## 19. Phases

1 Project setup · 2 Design system · 3 Navigation · 4 Hero · 5 About ·
6 Investment pillars · 7 Portfolio · 8 Founder reviews · 9 Team · 10 Final CTA ·
11 Footer · 12 Animation/polish · 13 Real assets · 14 SEO · 15 Accessibility ·
16 Performance · 17 Final QA · 18 Static deployment preparation

Complete and review each phase before starting the next. Never build the whole
site in one step.

## 20. Do not over-engineer

This is a marketing website. Prefer simple + modern + maintainable over complex
+ clever. No architecture the project doesn't justify.

## 21. Communication

Before significant implementation, briefly state: what you will do, why, which
files will likely change, and whether any dependency will be added. Then
implement. Afterwards report what changed, checks performed, reviewer findings,
what was fixed, and anything the owner should know. Skip explanations of basic
code unless asked.

## 22. Most important

CURRENT OFFICIAL BEST PRACTICE over old familiar code.
VERIFIED IMPLEMENTATION over assumption.
SIMPLE MAINTAINABLE CODE over unnecessary complexity.
Always: IMPLEMENT -> TEST -> SUBAGENT REVIEW -> FIX -> TEST.
