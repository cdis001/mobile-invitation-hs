// Florals.jsx — botanical accents & dividers for the Petrol colorway:
// gold single-line corner sprays + a gold sprig divider. All keyed to
// transparency, so they drop onto any surface without a blend mode.

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
      opacity: 0.9, pointerEvents: 'none',
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

// Big botanical for the cover — dedicated corner sprays (berry cluster
// top-right, leaf branch bottom-left). Both bundle the rounded card-corner arc,
// so they sit flush in the screen corners.
export function CoverFlorals({ amount }) {
  const a = AMOUNT[amount] || AMOUNT.normal
  const base = { position: 'absolute', pointerEvents: 'none', userSelect: 'none' }
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
export function CornerSpray({ amount, corner = 'tr' }) {
  const a = AMOUNT[amount] || AMOUNT.normal
  const base = { position: 'absolute', pointerEvents: 'none', userSelect: 'none',
    opacity: a.op * 0.85 }
  const pos = {
    tr: { top: -6, right: -8 },
    tl: { top: -6, left: -8, transform: 'scaleX(-1)' },
    br: { bottom: -6, right: -8, transform: 'scaleY(-1)' },
    bl: { bottom: -6, left: -8, transform: 'scale(-1,-1)' },
  }[corner]
  return <img src={F.cornerTR} alt="" style={{ ...base, ...pos, width: 96 * a.scale }} />
}
