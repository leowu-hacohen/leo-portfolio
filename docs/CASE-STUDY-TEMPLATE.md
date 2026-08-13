# Case study template — leowuhacohen.com

The rule that runs everything: **less information that makes more sense.** The artifact
(deck, demo, photos) carries the depth; the page just gets you to it warmly and fast.
Reference points: emmiwu.com/figma (image-led, spacious), the Findy page (canonical
implementation of this template).

## Page skeleton, in order

1. **Nav** — shared fixed nav (Back + Home / About / Work / Playground).
2. **Header block**
   - **Hero image first, when a real one exists.** A field photo, a product screenshot,
     real work. Content width (max 1100px), cropped to roughly 16:7, `caseStudyRadius`
     corners, soft fade-in. Never a 100vh type-only hero, and never a logo as the hero.
     If the project has no honest image, start quiet: kicker + title only, extra top space.
   - **Kicker** — one small serif line: `Project · Org · Year` (plus an award if real).
   - **H1 — exactly one sentence.** Max ~18 words, 34–44px (`caseStudyTitle` scale),
     plain words, says what the thing is and who it's for. Not a label
     ("BCEC: Brand Strategy"), not a vibe. A sentence I would say out loud.
   - No descriptor paragraph if the meta cards already cover role/timeline/team.
3. **Meta cards** — exactly 4 blocks: `Role`, `Timeline`, `Team`, plus one wildcard
   (`Method`, `Tools`, or `Result`). Five only when there's a real award. Never six.
4. **TLDR** — small label + 2–3 short paragraphs. No intermediate 52px headline between
   the H1 and the body. This is the whole story for someone who reads nothing else.
5. **Body — 2 to 4 sections max.** Each is: small serif label + one plain-sentence
   heading + substance (gallery, embed, video, diagram). If a Figma deck exists, the
   deck IS the middle of the case study; don't re-narrate its slides as page copy.
6. **Takeaways** — exactly 3 cards (`TakeawayCards`).
7. **Acknowledgments** — only when there are real people to thank, plus the contact line.
8. **NextProjectFooter.**

Spacing: content max-width 1000px, 12–14vh between major sections. Whitespace is the
default; earn every block that interrupts it.

## Copy rules (the voice pass)

- **No fragment chains.** "Eight weeks. Two senior centers. One question." is the AI
  tell this template exists to kill. Say it as one warm sentence instead.
- **No em dashes.** Commas, parentheticals, and slashes are the toolkit.
- **Every number real** and from the project. Reframe, never invent.
- **Warm and plain over cool.** If a line is trying to sound impressive, cut it or say
  it straight. One-line test: would a clearer version make me sound smaller? If yes,
  keep mine.
- **Headings are sentences a person would say.** "Check it out." passes. "Precision.
  Craft. Impact." does not.
- Full voice sources: `USER.md` and `Writing Kit.md` in the Obsidian vault.
