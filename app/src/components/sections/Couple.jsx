// 두 사람 (The Couple) — introduce groom and bride individually, each with a
// circular photo slot.

import { CornerSpray, Ornament } from '../Florals.jsx'
import ImageSlot from '../ImageSlot.jsx'
import { Eyebrow, SCRIPT, KRSERIF, KRSANS } from './shared.jsx'

function Person({ th, t, slotId, role, name, line, flip }) {
  const portrait = (
    <ImageSlot id={slotId} shape="circle" placeholder={role + ' 사진'}
      style={{ width: 108, height: 108, flex: '0 0 auto',
        boxShadow: '0 6px 18px -10px rgba(43,37,33,.4)' }} />
  )
  const text = (
    <div style={{ textAlign: flip ? 'right' : 'left' }}>
      <div style={{ fontFamily: KRSANS, fontSize: 11.5 * t.fontScale, color: th.muted,
        letterSpacing: (0.34 + t.spacing) + 'em' }}>{role}</div>
      <div style={{ fontFamily: KRSERIF, fontSize: 24 * t.fontScale, color: th.ink,
        letterSpacing: (0.1 + t.spacing) + 'em', marginTop: 7 }}>{name}</div>
      <div style={{ fontFamily: KRSERIF, fontSize: 13 * t.fontScale, color: th.muted,
        lineHeight: 1.7, marginTop: 8 }}>{line}</div>
    </div>
  )
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 22, flexDirection: flip ? 'row-reverse' : 'row' }}>
      {portrait}{text}
    </div>
  )
}

export default function Couple({ th, t }) {
  return (
    <section data-screen-label="두 사람" style={{
      position: 'relative', background: th.bg, padding: '78px 32px 84px',
      textAlign: 'center', overflow: 'hidden',
    }}>
      <CornerSpray amount={t.floralAmount} corner="tr" />
      <Eyebrow th={th} t={t}>두 사람</Eyebrow>
      <div style={{ margin: '22px 0 4px' }}><Ornament theme={th} w={58} /></div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 34,
        position: 'relative', zIndex: 2 }}>
        <Person th={th} t={t} slotId="couple-groom" role="신랑" name={t.groom}
          line={t.groomLine} flip={false} />
        <div style={{ fontFamily: SCRIPT, fontSize: 40 * t.fontScale, color: th.names,
          lineHeight: 0.6 }}>&amp;</div>
        <Person th={th} t={t} slotId="couple-bride" role="신부" name={t.bride}
          line={t.brideLine} flip={true} />
      </div>
    </section>
  )
}
