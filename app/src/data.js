// data.js — the invitation's data model: themes, floral assets, copy, and the
// presentation knobs (floralAmount / fontScale / spacing).
// These are just the invitation's content/config; edit them here.
// Song's Mobile Wedding Invitation · 결혼 안내장 (예식 없음 / 혼인신고)

// ---- Floral asset paths (served from public/florals) -----------------------
// Petrol uses gold lineart only: two corner sprays + a sprig divider.
export const F = {
  sprigBottom: '/florals/florals-line-sprig-bottom.png',
  cornerTR:    '/florals/florals-corner-tr.png',
  cornerBL:    '/florals/florals-corner-bl.png',
}

// ---- Colorway — Petrol only (deep teal + gold lineart florals) -------------
export const THEMES = {
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
  },
}

// ---- Invitation content + presentation config ------------------------------
// Warm, 담백한 구어체. The couple has already married (혼인신고) — no ceremony.
// `floralAmount | fontScale | spacing` are fixed design config
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
  groomLine: '제주도 산지직송, 귤수저',
  brideLine: '마음의 고향이 강원도인, 감자송',

  // — presentation knobs (fixed config) —
  floralAmount: 'normal',   // 'subtle' | 'normal' | 'lush'
  fontScale:    1,          // 0.85 – 1.2
  spacing:      0,          // -0.02 – 0.08 (em)
}

// ---- Photos (Cloudinary-hosted) --------------------------------------------
// Photos are NOT committed to git — they live on Cloudinary and are referenced
// by URL here. Setup:
//   1) Make a free Cloudinary account, copy your "Cloud name" from the
//      dashboard, and set CLOUDINARY_CLOUD_NAME below.
//   2) Upload each photo and give it the matching public ID (the asset's name
//      in Cloudinary): 'gallery-1' … 'gallery-5'.
//   3) Done — the URLs below resolve automatically. To swap a photo, re-upload
//      with the same public ID, or change the ID here.
// While CLOUDINARY_CLOUD_NAME is empty, every photo gracefully shows a
// placeholder (no broken requests).
const CLOUDINARY_CLOUD_NAME = 'dpgjkgir2' // e.g. 'dxxxxxxxx'

// Build a Cloudinary delivery URL. `f_auto,q_auto` auto-picks webp/avif and a
// sensible quality, so you never ship oversized originals.
export function cld(publicId, transforms = 'f_auto,q_auto') {
  if (!CLOUDINARY_CLOUD_NAME) return '' // not configured → Photo shows placeholder
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/${publicId}`
}

// Width-capped delivery for gallery slides; CSS object-fit: cover does the
// final framing inside the 300px-tall cell.
const GALLERY = 'v1780752726'

// Gallery photos — edit public IDs / add items here. (Couple 신랑·신부 사진은
// 로컬 public/pic/ 이미지를 직접 사용합니다.)
export const PHOTOS = {
  gallery: [
    { src: cld('KakaoTalk_Photo_2026-06-06-22-31-53_004_a9aww0.jpg', GALLERY), label: '행복한 우리🩵' },
    { src: cld('KakaoTalk_Photo_2026-06-06-22-31-53_003_ctltgq.jpg', GALLERY), label: '전투적인 멋진 송👊' },
    { src: cld('KakaoTalk_Photo_2026-06-06-22-31-53_005_ciio8i.jpg', GALLERY), label: '복스러운 하관💰' },
    { src: cld('KakaoTalk_Photo_2026-06-06-22-31-53_006_tinsu9.jpg', GALLERY), label: '나는야 롹스타🎸' },
    { src: cld('KakaoTalk_Photo_2026-06-06-22-31-53_007_y0q9zf.jpg', GALLERY), label: '술 먹고 뻗어버린 송😵‍💫' },
    { src: cld('KakaoTalk_Photo_2026-06-06-22-31-53_001_gpvua0.jpg', GALLERY), label: '살찜🐷' },
  ],
}
