# Handoff: 모바일 청첩장 (Mobile Wedding Announcement)

## Overview
A fully-digital, **mobile-first wedding announcement** ("안내장") for a couple who
have already married (혼인신고) and are **not holding a ceremony**. There is no
venue, time, map, or RSVP — instead the card warmly announces the news and shares
the couple. It is a single vertical, app-style scroll designed to be texted to
guests and viewed on a phone.

Built on **Song's Mobile Wedding Invitation Design System** (script monogram +
botanical framing + tan-gold thread). Ships in **three colorways** the user can
switch live: **Ivory**, **Petrol**, **Sage**.

**Sections, in scroll order:**
1. **Cover** — script monogram (S｜H), Korean names, date, intro line, scroll cue
2. **모시는 글 (Greeting)** — heartfelt note acknowledging there is no ceremony
3. **두 사람 (The Couple)** — groom & bride intro with circular photo slots
4. **사진 갤러리 (Gallery)** — **swipeable carousel** of 5 photo slots
5. **Closing** — monogram + date sign-off

---

## Running (Implementation)
This design has been **implemented as a React + Vite app** in `app/`. To run it:

```
cd app && yarn install
yarn dev      # start the dev server
yarn build    # production build (→ app/dist)
yarn preview  # preview the production build
```

See `app/README.md` for full run/build instructions.

## About the Design Files
The design has **been implemented** as a real **React + Vite** app in `app/` — this
is the source of truth going forward. The earlier HTML/React-via-Babel prototype
(which loaded React 18 + Babel from CDN and used inline-JSX `<script>` tags) has been
replaced by normal `.jsx` modules under `app/src/`. The original inline style objects
are **preserved as-is** in those components; only the CDN/Babel sandbox scaffolding
was dropped in favor of the Vite build pipeline.

For run/build instructions, see `app/README.md` (and the **Running** note above).

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, florals, copy, and
interactions are all specified. The implementation in `app/` matches these
pixel-accurately. Exact values are in **Design Tokens** below and in
`assets/colors_and_type.css` (bundled into the app as `app/src/tokens.css`).

---

## Layout Shell & Responsive Behavior

The whole card lives inside a **phone device frame** on desktop and **goes
full-bleed** on mobile.

- **Design canvas:** 404 px wide device; inner screen has `border-radius: 40px`
  (`--r-frame`) and `overflow: hidden`. Content is a single vertical
  scroll region (`.scroll`, `overflow-y: auto`, hidden scrollbar).
- **Desktop (≥ 600px):** device bezel (`background` = theme `bezel`,
  `border-radius: 52px`, padding 13px, `--shadow-device`). A colorway switcher
  and script wordmark sit above it. Device height `min(884px, calc(100vh - 132px))`.
- **Mobile (≤ 599px):** `.device` becomes `100vw × 100dvh`, no border-radius, no
  bezel, no notch. The colorway switcher becomes a **fixed floating pill** at
  `top: 12px`, centered, `z-index: 200`. Every section gets `padding-top: 92px` so
  the eyebrow clears the floating switcher.
- Page background (behind the device): radial cream gradient
  `radial-gradient(125% 95% at 50% 0%, #fbf7ef 0%, #f1ebe0 58%, #e8e0d3 100%)`.
- **Notch:** decorative pill at top center of the screen, `146×26`, `#15110e`,
  bottom corners radius 16, `z-index: 50` (hidden on mobile).

---

## Screens / Views

### 1. Cover
- **Purpose:** First impression — who, the monogram, the date, and the honest
  "no ceremony" framing.
- **Layout:** Full-height flex column, centered both axes, `text-align: center`,
  `padding: 72px 30px 56px`. A soft **pill-arch stage** sits behind the monogram:
  `232×392`, `background` = theme `surface`, `border-radius: 180px` (`--r-arch`),
  centered, `z-index: 0`. Content is `z-index: 2`.
- **Components (top → bottom):**
  - **Eyebrow:** theme `muted` color, Gowun Dodum, `12.5px × fontScale`,
    `letter-spacing: 0.42em`. Copy: `결혼 소식을 전합니다`.
  - **Ornament:** centered hairline–diamond–hairline divider, width 58.
  - **Monogram:** two Pinyon Script initials (`S`, `H`) at `112px × fontScale`,
    theme `script` color, separated by a `1×84` vertical rule (theme `rule`,
    opacity .7), gap 22.
  - **Names:** Gowun Batang `27px`, theme `ink`, `letter-spacing: 0.14em`; groom &
    bride flanking a Pinyon Script `&` (`32px`, theme `names` color). Each name
    `white-space: nowrap` to avoid mid-syllable breaks.
  - **Date block:** `2026 . 05 . 17` in Montserrat `20px`, weight 500,
    `letter-spacing: 0.14em`, between two `150×1` hairlines (theme `ruleHair`),
    13px vertical padding.
  - **Intro line:** Gowun Batang `13px`, theme `muted`, line-height 1.95 —
    `특별한 예식 없이,` / `새로운 시작을 알립니다.`
  - **Scroll cue:** "SCROLL" (Montserrat 9.5px, `letter-spacing .38em`) above a
    `1×22` vertical rule; gentle 2.6s loop nudging down 5px + opacity .45↔.9.
  - **Florals:** see Florals section — varies by colorway.

### 2. 모시는 글 (Greeting)
- **Purpose:** The emotional core — explains there's no ceremony, asks for warm
  wishes.
- **Layout:** `background` = theme `band`, `padding: 76px 36px 80px`, centered.
- **Components:**
  - Eyebrow `모시는 글`.
  - **LeafDivider** (gold sprig mirror pair, width 120).
  - **Body:** Gowun Batang `16px × fontScale`, theme `ink`, `line-height ≈ 2.15`,
    `white-space: pre-line`, `text-wrap: pretty`. (Full copy in **Content** below.)
  - **Sign-off:** Pinyon Script `S & H` at `38px`, theme `names` color.

### 3. 두 사람 (The Couple)
- **Purpose:** Introduce groom and bride individually.
- **Layout:** `background` = theme `bg`, `padding: 78px 32px 84px`, centered.
  A `CornerSpray` sits top-right.
- **Components:** Eyebrow `두 사람` → Ornament → a vertical stack (gap 26) of:
  - **Person row (groom):** circular photo slot (108×108) on the left, text on the
    right (`flip = false`). Role label (Gowun Dodum 11.5px, `letter-spacing .34em`,
    `신랑`), name (Gowun Batang 24px), one-line descriptor (Gowun Batang 13px,
    muted).
  - Pinyon Script `&` (40px, theme `names`).
  - **Person row (bride):** same but mirrored (`flip = true`, photo on right,
    `신부`).
  - Photo slots are **circular** drag-and-drop image placeholders with a soft
    shadow `0 6px 18px -10px rgba(43,37,33,.4)`.

### 4. 사진 갤러리 (Gallery) — **Carousel**
- **Purpose:** Browse photos one at a time by swiping.
- **Layout:** `background` = theme `band`, `padding: 76px 28px 80px`, centered.
- **Components:**
  - Eyebrow `우리의 순간들` → Ornament.
  - **Track:** horizontal fl/flex row, `overflow-x: auto`,
    `scroll-snap-type: x mandatory`, `border-radius: 16`, scrollbar hidden. Each
    slide is `flex: 0 0 100%`, `scroll-snap-align: center`, 2px padding, holding a
    **rounded image slot** (`width: 100%`, `height: 300px`, `border-radius: 14`).
    5 slides: `gallery-1 … gallery-5`, placeholders `대표 사진`, `사진 2`…`사진 5`.
  - **Controls row** (centered, gap 16): **prev arrow** · **counter + dots** ·
    **next arrow**.
    - **Arrows:** 40×40 circle, `1px solid` theme `ruleHair`, `background` theme
      `surface`, chevron icon (theme `accent`), `--shadow` `0 6px 16px -10px …`.
      Disabled at the ends (opacity .32, no pointer). Press scales to 0.92.
    - **Counter:** `01 / 05` — current index in theme `ink` (Montserrat 12px,
      weight 500, `letter-spacing .18em`), total in theme `muted`.
    - **Dots:** 5 pills, height 7, radius 999. Active dot `width: 18` + theme
      `accent`; inactive `width: 7` + theme `ruleHair`. `transition: width .3s,
      background .3s` (`--ease-soft`).
  - Helper text: `넘겨보세요 · 사진을 끌어다 놓아 채워주세요` (Gowun Dodum 11px, muted).

### 5. Closing
- **Purpose:** Warm sign-off.
- **Layout:** `background` = theme `bg`, `padding: 80px 32px 64px`, centered.
  `CoverFlorals` at `amount="subtle"`.
- **Components:** `함께라서, / 행복합니다` (Gowun Batang 21px, theme `ink`) →
  LeafDivider → Pinyon Script `S & H` (64px, theme `script`) → date (Montserrat
  13px, `letter-spacing .18em`, theme `ink`) → footer `SONG'S · MOBILE INVITATION`
  (Montserrat 9px, `letter-spacing .34em`, muted).

---

## Interactions & Behavior

- **Colorway switcher:** three pill chips (Ivory / Petrol / Sage). Active chip =
  theme `btn` background, white text; inactive = `#8a8073` text, transparent.
  Switching re-themes the entire card; `background`/`color` transitions run
  `0.45s var(--ease-soft)`.
- **Gallery carousel:**
  - Arrows call `go(idx ± 1)`, clamped to `[0, 4]`.
  - `go(n)` sets the active index immediately (instant dot/counter feedback),
    starts a **`scroll-behavior: smooth`** programmatic scroll to
    `n * track.clientWidth`, and sets a **600ms lock** so the scroll listener
    doesn't fight the programmatic move.
  - Manual swipe / drag updates index via the scroll listener:
    `idx = round(scrollLeft / clientWidth)` (ignored while the 600ms lock is active).
  - Dots are also clickable (`go(i)`).
  - **Implementation note:** don't rely *only* on smooth-scroll to drive the index —
    update index state on click too, because some embedded/preview contexts freeze
    the animation timeline and the smooth scroll won't progress. The lock-and-set
    pattern above handles both real browsers and frozen contexts.
- **Photo slots:** drag-and-drop image placeholders (`app/src/components/ImageSlot.jsx`).
  They accept drag-drop or click upload, downscale to WebP, and persist the image to
  `localStorage` keyed by slot `id`. A **reframe mode** (double-click a filled slot)
  lets you pan/zoom/resize the crop, persisted as `{u,s,x,y}`. Each slot has a
  **stable, unique id**.
- **Motion:** reserved and graceful only — gentle fades / soft settle
  (`cubic-bezier(0.22,0.61,0.36,1)`), 160–560ms. No bounce, no spring, no entrance
  animation that hides content by default (avoid `animation-fill-mode: both` on
  opacity-0 starts — it leaves content invisible in frozen-timeline contexts).

## State Management
- `colorway`: `'ivory' | 'petrol' | 'sage'` — selects the active theme object.
- `idx` (Gallery): active carousel slide `0–4`.
- `lock` (Gallery, ref/timestamp): suppresses scroll-listener index updates for
  600ms after programmatic navigation.
- **Editable content** (now fixed config in the `INVITATION` object in
  `app/src/data.js` — the prototype's live Tweaks panel was removed): `eyebrow`,
  `groom`, `bride`, `iniA`, `iniB`, `date`, `greeting`, `groomLine`, `brideLine`,
  plus presentation knobs `floralStyle` (`auto|sunflower|goldline|stem`),
  `floralAmount` (`subtle|normal|lush`), `fontScale` (0.85–1.2), `spacing`
  (-0.02–0.08 em).
- Photo slot images persisted per slot id.

---

## Design Tokens

Authoritative source: `assets/colors_and_type.css` (46 CSS custom properties).
Key values:

### Shared / brand
| Token | Value | Use |
|---|---|---|
| `--gold` | `#C29A63` | dividers, monogram, lineart (the brand thread) |
| `--gold-soft` | `#CDB089` | script names, hairlines |
| `--gold-deep` | `#A87E45` | pressed/darker gold, name color |
| `--ink` | `#2B2521` | warm near-black body (warm theme) |
| `--petrol` | `#103B47` | deep teal ink (cool themes) |
| `--rule-hair` | `rgba(194,154,99,0.55)` | hairlines |

### Surfaces
`--cream-50 #FBF6E6` · `--cream-100 #F7EFD3` · `--blush-50 #FBF2EB` ·
`--blush-100 #F7E2D0` · `--linen #F8EEE6` · `--white #FFFFFF` · `--gold-bg #D4B068`

### Theme objects (exported as `THEMES` from `app/src/data.js`)
Each colorway defines: `bezel, bg, surface, band, ink, muted, script, names, rule,
ruleHair, accent, btn, floral`.

- **Ivory** — bezel `#E7E2DA`, bg `#FBF6E6`, surface `#FFFBEF`, band `#F6EDCF`,
  ink `#2B2521`, script/accent/btn `#C29A63`, names `#A87E45`. Floral = filled
  **sunflower** bouquet.
- **Petrol** — bezel `#123843`, bg `#FFFFFF`, surface `#FBF2EB`, band `#F6F0EA`,
  ink/script/btn `#103B47`, names `#A87E45`, accent/rule `#C29A63`. Floral = gold
  **line** corner sprays.
- **Sage** — bezel `#4E5F32`, bg `#EDF0E2`, surface `#F7F8EE`, band `#E4E9D4`,
  ink `#39471F`, script/btn `#4F6E33`, accent `#7E8C3E`, names `#A87E45`. Floral =
  petrol-tinted line **stems**.

### Type
- Families: **Pinyon Script** (monogram + Latin `&`), **Montserrat** (Latin labels,
  dates), **Gowun Batang** (Korean serif — names, greeting, descriptors),
  **Gowun Dodum** (Korean sans — eyebrows, helper text). Korean fonts loaded from
  Google Fonts: `Gowun+Batang:wght@400;700` & `Gowun+Dodum`.
- Scale (CSS vars, @390px): monogram 132 · display 56 · date 34 · venue 22 ·
  eyebrow 15 · label 14 · body 15. (The components override several of these
  per-component in px — see each screen above; everything multiplies by `fontScale`.)
- Tracking: eyebrow `.22em` · label `.28em` · date `.06em` · venue `.10em`. Korean
  eyebrows use `.42em`.

### Radii / Shadow / Motion
- Radii: frame 40 · arch 180 · card 18 · button 999.
- Shadows: device `0 24px 60px -18px rgba(43,37,33,.35)` · card
  `0 10px 30px -12px rgba(43,37,33,.20)` · press `0 2px 8px -4px rgba(43,37,33,.30)`.
- Motion: ease `cubic-bezier(0.22,0.61,0.36,1)`; durations 160 / 280 / 560ms.

---

## Assets

All in `assets/florals/` (PNG, transparent, pre-tinted to brand colors — drop on
any surface, no blend mode needed). The app bundles copies in `app/public/florals/`,
served at `/florals/...`:

**Petrol (gold line) — recently updated:** the cover/corners now use dedicated
corner pieces extracted from Template B, each bundling the rounded card-corner arc:
- `florals-corner-tr.png` (198×340) — berry-cluster spray, sits flush **top-right**.
- `florals-corner-bl.png` (208×446) — leaf branch, sits flush **bottom-left**.

**Ivory (filled):** `florals-sunflower-bouquet.png` (anchored bottom, full width),
plus `florals-line-spray-a.png` as an accent.

**Sage (line stems, tinted petrol→sage via CSS filter
`sepia(1) saturate(2.6) hue-rotate(2deg) brightness(0.82)`):**
`florals-stem-leafy.png`, `florals-stem-fern.png`, `florals-stem-lavender.png`.

**Dividers / misc:** `florals-line-sprig-bottom.png` (LeafDivider, mirrored pair),
`florals-line-spray-a/b.png`, `florals-line-leafbranch.png`,
`florals-line-branchcluster.png`, `florals-line-sprig-top.png`,
`florals-stem-bloom.png`.

**Photos:** none included — the design uses empty drag-and-drop slots the user
fills (`app/src/components/ImageSlot.jsx`; images persist to `localStorage`).

**Icons:** the only functional glyph is the carousel chevron (inline SVG, 1.8px
stroke). For any additional UI chrome use **Lucide** at 1.5px stroke in petrol/gold
to match the lineart weight (per the design system). No emoji, ever.

---

## Files

The implementation lives in `app/` (React + Vite). See `app/README.md` for run
instructions. Key files:
- `app/index.html` — entry point / Vite HTML host (the device-shell and responsive
  CSS live in `app/src/index.css`).
- `app/src/data.js` — `THEMES` (3 colorways), the `INVITATION` content/config object
  (default Korean text, names/initials/date, plus presentation knobs: `floralStyle`,
  `floralAmount`, `fontScale`, `spacing`), and `F` (floral asset paths).
- `app/src/components/Florals.jsx` — `Ornament`, `LeafDivider`, `CoverFlorals`,
  `CornerSpray` (floral logic per colorway + amount).
- `app/src/components/sections/` — one file per screen: `Cover.jsx`, `Greeting.jsx`,
  `Couple.jsx`, `Gallery.jsx` (carousel), `Closing.jsx`, with shared eyebrow/font
  helpers in `shared.jsx`.
- `app/src/App.jsx` — composition + device/screen shell.
- `app/src/components/ColorwaySwitcher.jsx` — the live colorway switcher (real React
  state).
- `app/src/components/ImageSlot.jsx` — drag-drop + click upload image slot (WebP
  downscale, `localStorage` persistence keyed by slot id, plus double-click reframe
  mode persisted as `{u,s,x,y}`).
- `app/src/tokens.css` — bundled copy of the design tokens; `app/public/florals/` —
  bundled floral PNGs (served at `/florals/...`).

> Note: the prototype's live **Tweaks panel** has been removed. The editable content
> and presentation knobs it exposed are now fixed config in the `INVITATION` object
> in `app/src/data.js`; only the colorway switcher remains as live React state.

In `assets/` (still the authoritative design source, copied into the app):
- `colors_and_type.css` — design tokens (single source of truth; copied to
  `app/src/tokens.css`).
- `florals/` — all floral PNGs listed above (copied to `app/public/florals/`).

