// Florals.jsx — botanical accents & dividers, driven by colorway + config.
// Filled sunflower bouquet (Ivory), gold single-line sprays (Petrol),
// hand-drawn petrol stems (Sage) — all keyed to transparency.

import React from 'react'
import { F } from '../data.js'

const AMOUNT = {
  subtle: { op: 0.5,  extra: false, scale: 0.85 },
  normal: { op: 0.85, extra: false, scale: 1 },
  lush:   { op: 1,    extra: true,  scale: 1.12 },
}

// Small ornament under an eyebrow — gold thread, double-rule language.
export function Ornament({ theme: th, w = 64 }) {
  const line = { height: 1, flex: 1, background: th.rule, opacity: 0.7 }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 9, width: w, margin: '0 auto' }}>
      <span style={line} />
      <span style={{ width: 5, height: 5, background: th.rule,
        transform: 'rotate(45deg)', flex: '0 0 auto', borderRadius: 1 }} />
      <span style={line} />
    </div>
  )
}

// Larger leafy crest between major sections (gold sprig, mirrored for symmetry).
export function LeafDivider({ theme: th, w = 132 }) {
  const img = (flip) => (
    <img src={F.sprigBottom} alt="" style={{
      width: w, height: 'auto',
      transform: flip ? 'scaleX(-1)' : 'none',
      opacity: th.floral === 'stem' ? 0.78 : 0.9,
      filter: th.floral === 'stem'
        ? 'sepia(1) saturate(2.4) hue-rotate(2deg) brightness(0.85)' : 'none',
      pointerEvents: 'none',
    }} />
  )
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      {img(true)}
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: th.rule,
        margin: '0 4px', flex: '0 0 auto' }} />
      {img(false)}
    </div>
  )
}

// Big botanical for the cover, varying by floral style + amount.
export function CoverFlorals({ theme: th, style, amount }) {
  const a = AMOUNT[amount] || AMOUNT.normal
  const base = { position: 'absolute', pointerEvents: 'none', userSelect: 'none' }

  if (style === 'sunflower') {
    return (
      <>
        <img src={F.sunflower} alt="" style={{ ...base, bottom: 0, left: 0,
          width: '100%', opacity: a.op }} />
        {a.extra && (
          <img src={F.sprayA} alt="" style={{ ...base, top: -10, right: -14,
            width: 120 * a.scale, opacity: 0.6 }} />
        )}
      </>
    )
  }

  if (style === 'stem') {
    const tint = 'sepia(1) saturate(2.6) hue-rotate(2deg) brightness(0.82)'
    return (
      <>
        <img src={F.stemLeafy} alt="" style={{ ...base, bottom: -8, left: -6,
          width: 96 * a.scale, opacity: a.op, filter: tint }} />
        <img src={F.stemFern} alt="" style={{ ...base, bottom: -10, right: -8,
          width: 84 * a.scale, opacity: a.op, transform: 'scaleX(-1)', filter: tint }} />
        {a.extra && (
          <img src={F.stemLavender} alt="" style={{ ...base, top: 8, right: 4,
            width: 70 * a.scale, opacity: 0.7, filter: tint }} />
        )}
      </>
    )
  }

  // goldline (Petrol) — dedicated corner sprays extracted from Template B:
  // berry cluster top-right, leaf branch bottom-left. Both bundle the rounded
  // card-corner arc, so they sit flush in the screen corners.
  return (
    <>
      <img src={F.cornerTR} alt="" style={{ ...base, top: 0, right: 0,
        width: 132 * a.scale, opacity: a.op }} />
      <img src={F.cornerBL} alt="" style={{ ...base, bottom: 0, left: 0,
        width: 116 * a.scale, opacity: a.op }} />
      {a.extra && (
        <img src={F.cornerTR} alt="" style={{ ...base, bottom: 0, right: 0,
          width: 104 * a.scale, opacity: 0.62, transform: 'scaleY(-1)' }} />
      )}
    </>
  )
}

// Subtle single corner accent for interior sections.
export function CornerSpray({ theme: th, style, amount, corner = 'tr' }) {
  const a = AMOUNT[amount] || AMOUNT.normal
  const base = { position: 'absolute', pointerEvents: 'none', userSelect: 'none',
    opacity: a.op * 0.85 }
  const pos = {
    tr: { top: -6, right: -8 },
    tl: { top: -6, left: -8, transform: 'scaleX(-1)' },
    br: { bottom: -6, right: -8, transform: 'scaleY(-1)' },
    bl: { bottom: -6, left: -8, transform: 'scale(-1,-1)' },
  }[corner]

  let src = F.sprayB, w = 104
  if (style === 'sunflower') { src = F.sprayB }
  else if (style === 'stem') {
    src = F.stemFern; w = 72
    base.filter = 'sepia(1) saturate(2.6) hue-rotate(2deg) brightness(0.82)'
  } else { src = F.cornerTR; w = 96 }

  return <img src={src} alt="" style={{ ...base, ...pos, width: w * a.scale }} />
}
