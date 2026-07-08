# Pricing & "What to expect" copy worksheet

Companion to `COPYWRITING-WORKSHEET.md`, scoped to the new additions we discussed: a "What to expect" block on the Photography and Social media pages, and the retainer case study on the Social media page. Same format — current copy (blank where nothing exists yet) vs. new copy — so you can mark up numbers and wording directly.

**Direction locked in from our conversation:**
- No combined pricing menu on the Contact page — expectations are split by page so each reads as specialist depth, not a generalist rate card (Photography page shows photography terms only, Social media page shows content terms only).
- Anchor/range pricing only ("from $X"), not itemized rate cards — protects room to custom-quote corporate work while still giving small businesses something to self-qualify against.
- Retainer case study should say "ongoing content partnership," not "monthly retainer," to stay accurate to the on-and-off cadence.
- All numbers below are **placeholders in brackets** — nothing is a real quote yet. Replace and delete anything that doesn't apply.

---

## Photography page — "What to expect" block

**File:** `src/pages/photography/index.astro` (new section, placed near the existing bottom CTA — "Got an event worth capturing well?")

| Element | Current copy | New copy (draft) |
|---|---|---|
| Eyebrow | *(new)* | `What to expect` |
| Heading | *(new)* | `Good to know before you reach out.` |
| Line 1 — starting price | *(new)* | `Coverage starts from [$X] for half-day events, [$Y] for full-day.` |
| Line 2 — what's included | *(new)* | `Every gallery includes [N] edited images and a private online gallery to share or download from.` |
| Line 3 — turnaround | *(new)* | `Edited galleries are delivered within [X business days].` |
| Line 4 — lead time | *(new)* | `Weekend and peak-season dates book out fast — reach out at least [X weeks] ahead if you can.` |
| Line 5 — usage rights *(optional, only if you restrict this)* | *(new)* | `Images are yours to use for marketing, recaps, and future promotion.` |

---

## Social media page — "What to expect" block

**File:** `src/pages/content/index.astro` (new section, placed near the existing `ContactSection` at the bottom)

| Element | Current copy | New copy (draft) |
|---|---|---|
| Eyebrow | *(new)* | `What to expect` |
| Heading | *(new)* | `Good to know before you reach out.` |
| Line 1 — starting price | *(new)* | `Single pieces start from [$X]. Ongoing content partnerships start from [$Y]/month.` |
| Line 2 — what's included | *(new)* | `A typical monthly scope covers [N] pieces across [platforms], with [N] rounds of revisions per piece.` |
| Line 3 — turnaround | *(new)* | `A single video is delivered within [X business days] of filming.` |
| Line 4 — commitment *(optional, only include if true)* | *(new)* | `Ongoing partnerships run on a [no-lock-in / month-to-month] basis.` |

---

## Contact page — unchanged, kept minimal on purpose

**File:** `src/pages/contact.astro`

| Element | Current copy | New copy |
|---|---|---|
| Card body | `Best for enquiries, briefs, or just checking availability. I typically reply within the day.` | *(keep — this is the one universal expectation-setting line; page-specific pricing/turnaround stays on Photography and Social media pages, not duplicated here)* |

---

## Retainer case study (Social media page, featured slot)

**File:** new entry in `src/content/content-work/`, e.g. `[client-slug]-ongoing-partnership.mdx`. Toggle `sections.caseStudy` to `true` in `src/lib/site.ts` once this is written.

| Field | Current | New copy (draft) |
|---|---|---|
| `contentType` | — | `case-study` |
| `featured` | — | `true` |
| `role` | — | `Ongoing content partner` |
| `generatedTitle` | — | `[Client name] — Ongoing Content Partnership` |
| `summary` | — | `Working with [client] across [rough date range] to keep [platform(s)] active — picking work back up for campaigns as needed rather than a fixed monthly cadence.` |
| Body (rendered under the case study) | — | `[Client] brought me on to handle [Instagram/TikTok] content in bursts rather than a strict monthly retainer — active during [describe periods/campaigns], quieter in between. Over that time I delivered [N] pieces covering [what kind of content]. [Include a result or client reaction here if you have one — a quote, a metric, or just what changed for them.]` |
| `metrics` *(optional, only if you have real numbers)* | — | `[value] / [label]` e.g. `12 / pieces delivered` |

This one needs your input most — I don't have the client name, dates, or what was actually delivered, so the draft above is a shape to fill in, not usable copy yet.

---

## Open questions for you to answer before we lock numbers

1. Photography: flat starting price, a range, or price withheld and only turnaround shown?
2. Social media: per-piece rate, monthly retainer rate, or both?
3. Any real minimum commitment on ongoing content work, or is it genuinely ad hoc?
4. Usage rights — any restriction on client use of photos (e.g. personal use only vs. full marketing rights)?
5. Retainer case study — client name (or anonymized as "a Singapore tuition brand" if they'd rather not be named), rough active months, what was delivered, and any result/quote you have.
