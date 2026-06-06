// data.js — the invitation's data model: themes, floral assets, copy, and the
// presentation knobs (floralStyle / floralAmount / fontScale / spacing).
// These are just the invitation's content/config; edit them here.
// Song's Mobile Wedding Invitation · 결혼 안내장 (예식 없음 / 혼인신고)

// ---- Floral asset paths (served from public/florals) -----------------------
export const F = {
  sunflower:     '/florals/florals-sunflower-bouquet.png',
  sprayA:        '/florals/florals-line-spray-a.png',
  sprayB:        '/florals/florals-line-spray-b.png',
  leafbranch:    '/florals/florals-line-leafbranch.png',
  branchcluster: '/florals/florals-line-branchcluster.png',
  sprigTop:      '/florals/florals-line-sprig-top.png',
  sprigBottom:   '/florals/florals-line-sprig-bottom.png',
  cornerTR:      '/florals/florals-corner-tr.png',
  cornerBL:      '/florals/florals-corner-bl.png',
  stemLavender:  '/florals/florals-stem-lavender.png',
  stemLeafy:     '/florals/florals-stem-leafy.png',
  stemBloom:     '/florals/florals-stem-bloom.png',
  stemFern:      '/florals/florals-stem-fern.png',
}

// ---- Three colorways (the only thing that changes between moods) -----------
export const THEMES = {
  ivory: {
    label: 'Ivory',
    bezel:   '#E7E2DA',
    bg:      '#FBF6E6',          // cream-50
    surface: '#FFFBEF',          // pill-arch / card stage
    band:    '#F6EDCF',          // alternating soft band
    ink:     '#2B2521',          // --ink
    muted:   'rgba(43,37,33,0.62)',
    script:  '#C29A63',          // --gold
    names:   '#A87E45',          // --gold-deep
    rule:    '#C29A63',
    ruleHair:'rgba(194,154,99,0.55)',
    accent:  '#C29A63',
    btn:     '#C29A63',
    floral:  'sunflower',
  },
  petrol: {
    label: 'Petrol',
    bezel:   '#123843',
    bg:      '#FFFFFF',
    surface: '#FBF2EB',          // blush-50
    band:    '#F6F0EA',
    ink:     '#103B47',          // --petrol
    muted:   'rgba(16,59,71,0.58)',
    script:  '#103B47',
    names:   '#A87E45',
    rule:    '#C29A63',
    ruleHair:'rgba(194,154,99,0.55)',
    accent:  '#C29A63',
    btn:     '#103B47',
    floral:  'goldline',
  },
  sage: {
    label: 'Sage',
    bezel:   '#4E5F32',
    bg:      '#EDF0E2',
    surface: '#F7F8EE',
    band:    '#E4E9D4',
    ink:     '#39471F',
    muted:   'rgba(57,71,31,0.58)',
    script:  '#4F6E33',
    names:   '#A87E45',
    rule:    '#C29A63',
    ruleHair:'rgba(120,140,80,0.45)',
    accent:  '#7E8C3E',
    btn:     '#4F6E33',
    floral:  'stem',
  },
}

// ---- Invitation content + presentation config ------------------------------
// Warm, 담백한 구어체. The couple has already married (혼인신고) — no ceremony.
// `floralStyle | floralAmount | fontScale | spacing` are fixed design config
// (originally adjustable knobs, now pinned to these chosen defaults).
export const INVITATION = {
  // — the couple —
  eyebrow:  '결혼 소식을 전합니다',
  groom:    '이승준',
  bride:    '김한송',
  iniA:     'S',
  iniB:     'H',
  date:     '2026 . 05 . 17',

  // — 모시는 글 (honest about there being no ceremony) —
  greeting:
`오랜 시간 곁에서 서로를 아껴온 두 사람이
이제 부부라는 이름으로
같은 곳을 바라보며 걸어가려 합니다.

따로 예식은 올리지 않지만,
저희의 새로운 시작을
가장 먼저 알리고 싶은 분들께
이렇게 소식을 전합니다.

축하해 주시는 따뜻한 마음,
오래도록 잊지 않고 살겠습니다.`,
  groomLine: '언제나 한결같은,  든든한 사람',
  brideLine: '늘 곁에서  웃게 해주는 사람',

  // — presentation knobs (fixed config) —
  floralStyle:  'auto',     // 'auto' | 'sunflower' | 'goldline' | 'stem'
  floralAmount: 'normal',   // 'subtle' | 'normal' | 'lush'
  fontScale:    1,          // 0.85 – 1.2
  spacing:      0,          // -0.02 – 0.08 (em)
}

export const DEFAULT_COLORWAY = 'ivory'
