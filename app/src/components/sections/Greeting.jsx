// 모시는 글 (Greeting) — the emotional core: explains there's no ceremony,
// asks for warm wishes.

import { LeafDivider } from '../Florals.jsx'
import { Eyebrow, SCRIPT, KRSERIF } from './shared.jsx'

export default function Greeting({ th, t }) {
  return (
    <section data-screen-label="모시는 글" style={{
      position: 'relative', background: th.band, padding: '76px 36px 80px',
      textAlign: 'center', overflow: 'hidden',
    }}>
      <Eyebrow th={th} t={t}>모시는 글</Eyebrow>
      <div style={{ margin: '24px 0 30px' }}><LeafDivider theme={th} w={120} /></div>
      <p style={{ fontFamily: KRSERIF, fontSize: 16 * t.fontScale, color: th.ink,
        lineHeight: 2.15 + t.spacing * 2, letterSpacing: (0.01 + t.spacing) + 'em',
        whiteSpace: 'pre-line', margin: 0, textWrap: 'pretty' }}>{t.greeting}</p>
      <div style={{ marginTop: 34, fontFamily: SCRIPT, fontSize: 38 * t.fontScale,
        color: th.names, lineHeight: 1 }}>{t.iniA} &amp; {t.iniB}</div>
    </section>
  )
}
