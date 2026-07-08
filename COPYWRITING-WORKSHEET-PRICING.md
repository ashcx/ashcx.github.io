# Pricing & "What to expect" copy worksheet

Companion to `COPYWRITING-WORKSHEET.md`, scoped to the new additions we discussed: a "What to expect" block on the Photography and Social media pages, and the retainer case study on the Social media page. Same format — current copy (blank where nothing exists yet) vs. new copy — so you can mark up numbers and wording directly.

**Direction locked in from our conversation:**
- No combined pricing menu on the Contact page — expectations are split by page so each reads as specialist depth, not a generalist rate card (Photography page shows photography terms only, Social media page shows content terms only).
- Anchor/range pricing only ("from $X"), not itemized rate cards — protects room to custom-quote corporate work while still giving small businesses something to self-qualify against.
- Retainer case study should say "ongoing content partnership," not "monthly retainer," to stay accurate to the on-and-off cadence.
- All numbers below are **placeholders in brackets** — nothing is a real quote yet. Replace and delete anything that doesn't apply.
- Suggested starting anchors (based on current Singapore market research — see numbers below each block) are pencilled in as a starting point. You have real corporate proof (Visa, DP World, Standard Chartered), so these sit mid-market rather than bottom-of-market, but confirm before locking.

**Suggested anchors, for reference:**
| Service | Suggested "from" price | Rationale |
|---|---|---|
| Half-day event coverage (2-3hr) | $600 | Comfortably mid-range for the $500-1,200 SG bracket — narrowed from 2-4hr so a booking at the top of the window doesn't quietly underprice you |
| Full-day event coverage (7-10hr) | $1,400 | Just below the $1,500 typical full-day floor, keeping the half-day/full-day ratio reasonable (~2.3x) |
| Single social video/reel | $350 | Still below the $500 "basic" SG bracket floor, per your call to keep it approachable — worth revisiting once the About/credentials gap is closed and the price can climb without feeling mismatched |
| Campaign package (3 pieces, one-off) | $875 | For small businesses with a specific launch/promotion who don't want an ongoing commitment — same ~17% bundle discount vs. 3 singles at $350 ($1,050), scaled proportionally |
| Ongoing content partnership | $1,200/month | Roughly a 3-4 piece/month cadence — below the $3,500+ full in-house monthly model, which assumes 10+ pieces/month |

---

## Photography page — "What to expect" block

**File:** `src/pages/photography/index.astro` (new section, placed near the existing bottom CTA — "Got an event worth capturing well?")

| Element | Current copy | New copy (draft) |
|---|---|---|
| Eyebrow | *(new)* | `What to expect` |
| Heading | *(new)* | `Good to know before you reach out.` |
| Line 1 — starting price | *(new)* | `Coverage starts from $600 for half-day events (2-3hr), $1,400 for full-day.` |
| Line 2 — what's included | *(new)* | `Every gallery includes 60-100 edited images and a private online gallery to share or download from.` |
| Line 3 — turnaround | *(new)* | `Edited galleries are delivered within 5 business days.` |
| Line 4 — lead time | *(new)* | `Weekend and peak-season dates book out fast — reach out at least 2 weeks ahead if you can.` |
| Line 5 — usage rights *(optional, only if you restrict this)* | *(new)* | `Images are yours to use for marketing, recaps, and future promotion.` |

---

## Social media page — "What to expect" block

**File:** `src/pages/content/index.astro` (new section, placed near the existing `ContactSection` at the bottom)

| Element | Current copy | New copy (draft) |
|---|---|---|
| Eyebrow | *(new)* | `What to expect` |
| Heading | *(new)* | `Good to know before you reach out.` |
| Line 1 — starting price | *(new)* | `Single pieces start from $350. Campaign packages (multiple pieces for a launch or promotion) start from $875. Ongoing content partnerships start from $1,200/month.` |
| Line 2 — what's included | *(new)* | `A typical monthly scope covers up to 4 pieces across Instagram, TikTok, or LinkedIn, with 1 round of revisions per piece.` |
| Line 3 — turnaround | *(new)* | `A single video is delivered within 3 business days of filming.` |
| Line 4 — commitment *(optional, only include if true)* | *(new)* | `Ongoing partnerships run month-to-month — no lock-in contract.` |

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

All pricing and operational lines are now filled in with contextually reasonable defaults (see table above for rationale). Confirm or correct anything that doesn't match reality — these are drafts, not final:

1. Photography: 60 edited images as the floor — bump this up/down if your actual output per shoot is different.
2. Photography: 5 business day turnaround, 2 week lead time — adjust if your actual workflow is faster/slower.
3. Social media: 4 pieces/month, 1 revision round, 3 business day turnaround, month-to-month commitment — adjust to match how you'd actually want to run it.
4. Usage rights — currently drafted as unrestricted marketing use. Flag if you want to restrict this (e.g. personal use only unless otherwise agreed).
5. Retainer case study — this is the one item I can't fill in for you: client name (or anonymized description), rough active months, what was delivered, and any result/quote you have. Nothing else in this worksheet is blocked, but this section needs your real details before it's usable.
