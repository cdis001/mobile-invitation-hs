// ColorwaySwitcher — three pill chips (Ivory / Petrol / Sage). Active chip =
// theme btn background + white text; switching re-themes the whole card.

import { THEMES } from '../data.js'

export default function ColorwaySwitcher({ value, onChange }) {
  return (
    <div className="switcher">
      {Object.entries(THEMES).map(([k, v]) => (
        <button key={k} className="sw-chip" onClick={() => onChange(k)}
          style={value === k
            ? { background: v.btn, color: '#fff' }
            : { color: '#8a8073' }}>
          {v.label}
        </button>
      ))}
    </div>
  )
}
