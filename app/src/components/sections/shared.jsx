// shared.jsx — font stacks + the small eyebrow label used by every section.
// Korean-first; Latin only for the script monogram + numeric date.

export const SCRIPT  = "'Pinyon Script', cursive"
export const SANS    = "'Montserrat', sans-serif"
export const KRSERIF = "'Gowun Batang', serif"
export const KRSANS  = "'Gowun Dodum', sans-serif"

export function Eyebrow({ th, t, children }) {
  return (
    <div style={{
      fontFamily: KRSANS, fontSize: 12.5 * t.fontScale, color: th.muted,
      letterSpacing: (0.42 + t.spacing) + 'em', textIndent: (0.42 + t.spacing) + 'em',
      fontWeight: 400,
    }}>{children}</div>
  )
}
