// Closing — warm sign-off.

import { useState } from 'react'
import { CoverFlorals } from '../Florals.jsx'
import BouncingCharacter from '../BouncingCharacter.jsx'
import { SCRIPT, SANS, KRSERIF } from './shared.jsx'

export default function Closing({ th, t }) {
  // Clicking either character replays the whole pair's bounce-in.
  const [playKey, setPlayKey] = useState(0)
  const replay = () => setPlayKey((k) => k + 1)

  return (
    <section data-screen-label="Closing" style={{
      position: 'relative', background: th.bg, padding: '80px 32px 64px',
      textAlign: 'center', overflow: 'hidden',
    }}>
      <CoverFlorals amount="subtle" />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: KRSERIF, fontSize: 21 * t.fontScale, color: th.ink,
          letterSpacing: (0.06 + t.spacing) + 'em', lineHeight: 1.7, marginBottom: 45 }}>
          오래오래<br />행복하게 살겠습니다.
        </div>
        <div style={{ fontFamily: SCRIPT, fontSize: 64 * t.fontScale, color: th.script,
          lineHeight: 0.9 }}>{t.iniA} &amp; {t.iniB}</div>

        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center',
          alignItems: 'flex-end' }}>
          <BouncingCharacter th={th} width={104} ball="#F2913D" outline="#D9772A"
            role="hittee" playKey={playKey} onReplay={replay} />
          <BouncingCharacter th={th} width={104} delay={0.14} ball="#F0DCAAFF"
            role="hitter" style={{ marginLeft: -46 }} playKey={playKey} onReplay={replay} />
        </div>

        <div style={{ marginTop: 28, fontFamily: SANS, fontSize: 9, letterSpacing: '0.34em',
          color: th.muted, textIndent: '0.34em' }}>MOBILE INVITATION</div>
      </div>
    </section>
  )
}
