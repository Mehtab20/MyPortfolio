# Design spec: extracted from fawadiqbal.dev

Source: 11 mobile screenshots (360 CSS px wide, 2× density) supplied by Mehtab on 2026-11-22.
Colours were sampled from the pixels; sizes are CSS px (screenshot px ÷ 2).
Desktop layout was not captured, so desktop rules below are extrapolated from the mobile design.

Only the *design system* is reused. All content (name, text, projects, photo) is Mehtab's own.

---

## 1. Colour

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--bg` | `#f8f9f8` | `#090f16` | Page background |
| `--surface` | `#fdfdfc` | `#0e151e` | Cards, nav |
| `--surface-2` | `#f1f4f3` | `#141c26` | Meta pills, image wells, social buttons |
| `--border` | `#e5ebe9` | `#1d2732` | Card and chip borders |
| `--text` | `#131720` | `#f1f5f9` | Headings, primary text |
| `--text-2` | `#656c7b` | `#9aa4b2` | Body, subtitles |
| `--text-3` | `#8b93a1` | `#6b7685` | Dates, counts |
| `--primary` | `#23a997` | `#2dd4bf` | Buttons, links, FAB, dots, check marks |
| `--primary-ink` | `#ffffff` | `#04211d` | Text on primary buttons |
| `--primary-soft` | `#e7f4f1` | `#0e2c30` | Icon boxes, badges, active nav item |
| Gradient | `#14b8a6 → #0ea5e9` | `#2dd4bf → #22d3ee` | Highlighted heading word, name, underline bar, progress bar, card accent edge |
| Grid lines | `rgba(15,23,42,.045)` | `rgba(148,163,184,.06)` | 70 px background grid |
| Star | `#fbbf24` | same | Ratings (not used: no testimonials) |

## 2. Typography

- **Family:** Outfit (geometric sans, single-storey "a") for everything; Fira Code for the hero role badge and card numbers.
- **Section title:** 34 px mobile → 48 px desktop, weight 600, tracking −0.02em. One word is gradient-filled ("Featured **Projects**", "**Skills** & Technologies").
- **Eyebrow:** 13 px, weight 600, uppercase, tracking 0.3em, `--primary`.
- **Underline bar:** 56 × 4 px, fully rounded, gradient, soft glow, centred 20 px under the title.
- **Section subtitle:** 17 px, line-height 1.8, `--text-2`, centred, max 640 px.
- **Card title:** 20–22 px, weight 600. **Body:** 16 px, line-height 1.7.
- **Chips:** 14 px, weight 400.

## 3. Shape, spacing, depth

- Container max 1200 px, side padding 16 px mobile / 24 px desktop.
- Section padding 80 px mobile / 112 px desktop; header-to-content gap 48 px.
- Card radius 20 px, padding 20–24 px, 1 px border, shadow `0 1px 2px rgba(0,0,0,.03)`; hover lifts 4 px with a teal-tinted shadow.
- Icon box 40–44 px, radius 12 px, `--primary-soft` background, `--primary` icon.
- Chips and pills fully rounded; chip = 1 px border + transparent; meta pill = `--surface-2` fill + icon.
- Buttons: 52 px tall, fully rounded. Primary = solid `--primary` with icon + chevron. Secondary = 1 px outline. Tertiary = text + icon.

## 4. Global components

- **Scroll progress bar:** 2 px gradient line fixed at the very top.
- **Navbar:** 64 px, `--surface` with blur, bottom hairline. Left: 40 px circular avatar with gradient ring + name in gradient text (22 px, 600). Right: account/résumé icon + hamburger. Desktop: inline links + theme toggle.
- **Drawer (mobile menu):** slides in from the left, ~68% width (max 320 px), dark panel, 3 px gradient accent bar on its left edge. Header: avatar + name + close. Rows: 48 px, icon + label + faint "→"; active row has `--primary-soft` fill, 1 px teal border, teal text. Footer: secondary link + "Toggle theme" row with a border.
- **Background:** 70 px square grid lines across the page, plus a soft radial teal glow behind the hero.
- **Back-to-top FAB:** 56 px teal circle, chevron-up, bottom-right 24 px, appears after scrolling.

## 5. Section wireframes (mobile)

```
HERO (centred, full height)
  ( photo 150px, gradient ring )
  [ ✧ <Role | Role | Role />   ]   ← mono pill, primary-soft, teal text
  First LAST                        ← 44px, LAST in gradient
  tagline, 2 lines, text-2
  [  💬 Let's Talk  >        ]      ← full-width primary
  [  ↗ View Projects         ]      ← full-width outline
     ⤓ Download CV                  ← text button
  (gh) (in) (✉)                     ← 44px round icon buttons

SECTION HEADER (every section, centred)
  EYEBROW
  Title With Gradient Word
  ────  (gradient bar)
  subtitle

SERVICES:  card ▸ icon box(emoji) · "01" mono top-right · title · desc · divider · ✓ list · "Start a project >"
SKILLS:    card ▸ icon box · title · "N technologies" · chips
PROJECTS:  [All] [Featured] pill tabs ▸ card: image well (badge top-right, action top-left) · title · 📅 date · desc · teal chips +n · [👁 View Details]
EXPERIENCE: vertical teal line + dot ▸ card with 3px gradient left edge · title · 🏢 company (teal) · pills (📅 dates)(📍 place) · desc · chips
EDUCATION: card with gradient left edge ▸ icon box 🎓 · degree · school · pills · divider · desc · KEY COURSES chips
CONTACT:   info cards (icon box + label + value) · form card
FOOTER:    name · tagline · quick links · contact · © year · back to top
```

## 6. Deliberately not carried over

- Skill percentages, "100% Verified" counters and testimonials: Mehtab has no verified data for these, and the brief rules out fake statistics.
- Certifications and Blog: hidden until there is real content.
