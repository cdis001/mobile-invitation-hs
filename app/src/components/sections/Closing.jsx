// Closing — warm sign-off.

import { CoverFlorals, LeafDivider } from '../Florals.jsx'
import { SCRIPT, SANS, KRSERIF } from './shared.jsx'

export default function Closing({ th, t }) {
  return (
    <section data-screen-label="Closing" style={{
      position: 'relative', background: th.bg, padding: '80px 32px 64px',
      textAlign: 'center', overflow: 'hidden',
    }}>
      <CoverFlorals amount="subtle" />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: KRSERIF, fontSize: 21 * t.fontScale, color: th.ink,
          letterSpacing: (0.06 + t.spacing) + 'em', lineHeight: 1.7, marginBottom: 45 }}>
          함께라서,<br />행복합니다
        </div>
        <div style={{ fontFamily: SCRIPT, fontSize: 64 * t.fontScale, color: th.script,
          lineHeight: 0.9 }}>{t.iniA} &amp; {t.iniB}</div>
        <div style={{ marginTop: 46, fontFamily: SANS, fontSize: 9, letterSpacing: '0.34em',
          color: th.muted, textIndent: '0.34em' }}>MOBILE INVITATION</div>
      </div>
    </section>
  )
}
