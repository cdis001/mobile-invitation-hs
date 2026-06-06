// Cover — first impression: who, the monogram, the date, the honest
// "no ceremony" framing.

import { CoverFlorals, Ornament } from '../Florals.jsx'
import { Eyebrow, SCRIPT, SANS, KRSERIF } from './shared.jsx'

export default function Cover({ th, t }) {
  return (
    <section data-screen-label="Cover" style={{
      position: 'relative', minHeight: '100%', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '72px 30px 56px', boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      <CoverFlorals amount={t.floralAmount} />

      {/* soft pill-arch stage behind the monogram */}
      <div style={{ position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-54%)', width: 232, height: 392,
        background: th.surface, borderRadius: 180, zIndex: 0,
        boxShadow: '0 1px 0 ' + th.ruleHair + ' inset' }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex',
        flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Eyebrow th={th} t={t}>{t.eyebrow}</Eyebrow>
        <div style={{ marginTop: 18, marginBottom: 16 }}><Ornament theme={th} w={58} /></div>

        {/* script monogram */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
          <span style={{ fontFamily: SCRIPT, fontSize: 112 * t.fontScale, lineHeight: 0.8,
            color: th.script }}>{t.iniA}</span>
          <span style={{ width: 1, height: 84, background: th.rule, opacity: 0.7 }} />
          <span style={{ fontFamily: SCRIPT, fontSize: 112 * t.fontScale, lineHeight: 0.8,
            color: th.script }}>{t.iniB}</span>
        </div>

        {/* Korean names */}
        <div style={{ marginTop: 22, fontFamily: KRSERIF, fontSize: 27 * t.fontScale,
          color: th.ink, letterSpacing: (0.14 + t.spacing) + 'em', display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'nowrap' }}>
          <span style={{ whiteSpace: 'nowrap', flex: '0 0 auto' }}>{t.groom}</span>
          <span style={{ fontFamily: SCRIPT, fontSize: 32 * t.fontScale, color: th.names,
            transform: 'translateY(2px)', flex: '0 0 auto' }}>&amp;</span>
          <span style={{ whiteSpace: 'nowrap', flex: '0 0 auto' }}>{t.bride}</span>
        </div>

        {/* date between hairlines */}
        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ width: 150, height: 1, background: th.ruleHair }} />
          <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: 20 * t.fontScale,
            letterSpacing: (0.14 + t.spacing) + 'em', color: th.ink, padding: '13px 0' }}>
            {t.date}</span>
          <span style={{ width: 150, height: 1, background: th.ruleHair }} />
        </div>

        <div style={{ marginTop: 22, fontFamily: KRSERIF, fontSize: 13 * t.fontScale,
          color: th.muted, lineHeight: 1.95, letterSpacing: t.spacing + 'em' }}>
          특별한 예식 없이,<br />새로운 시작을 알립니다.
        </div>
      </div>

      {/* scroll cue */}
      <div className="scroll-cue" style={{ position: 'absolute', bottom: 18, left: '50%',
        transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 6, zIndex: 2 }}>
        <span style={{ fontFamily: SANS, fontSize: 9.5, letterSpacing: '0.38em',
          color: th.muted, textIndent: '0.38em' }}>SCROLL</span>
        <span style={{ width: 1, height: 22, background: th.rule, opacity: 0.6 }} />
      </div>
    </section>
  )
}
