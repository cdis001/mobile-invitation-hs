// Closing — warm sign-off.

import { CoverFlorals, LeafDivider } from '../Florals.jsx'
import { SCRIPT, SANS, KRSERIF } from './shared.jsx'

export default function Closing({ th, t }) {
  const floral = t.floralStyle === 'auto' ? th.floral : t.floralStyle
  return (
    <section data-screen-label="Closing" style={{
      position: 'relative', background: th.bg, padding: '80px 32px 64px',
      textAlign: 'center', overflow: 'hidden',
    }}>
      <CoverFlorals theme={th} style={floral} amount="subtle" />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: KRSERIF, fontSize: 21 * t.fontScale, color: th.ink,
          letterSpacing: (0.06 + t.spacing) + 'em', lineHeight: 1.7 }}>
          함께라서,<br />행복합니다
        </div>
        <div style={{ margin: '30px 0 26px' }}><LeafDivider theme={th} w={120} /></div>
        <div style={{ fontFamily: SCRIPT, fontSize: 64 * t.fontScale, color: th.script,
          lineHeight: 0.9 }}>{t.iniA} &amp; {t.iniB}</div>
        <div style={{ marginTop: 16, fontFamily: SANS, fontSize: 13 * t.fontScale,
          letterSpacing: (0.18 + t.spacing) + 'em', color: th.ink }}>{t.date}</div>
        <div style={{ marginTop: 46, fontFamily: SANS, fontSize: 9, letterSpacing: '0.34em',
          color: th.muted, textIndent: '0.34em' }}>SONG&apos;S · MOBILE INVITATION</div>
      </div>
    </section>
  )
}
