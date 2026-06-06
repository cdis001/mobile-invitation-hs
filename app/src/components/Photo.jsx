// Photo.jsx — plain, non-editable image for the invitation. Shows `src` with
// the given shape and object-fit; if `src` is missing or fails to load, it
// shows a quiet placeholder. No upload / drag-drop / crop — this is a finished
// display image, not a fillable slot.

import React from 'react'

function radiusFor(shape, radius) {
  if (shape === 'circle') return '50%'
  if (shape === 'pill') return '9999px'
  return (Number.isFinite(radius) ? radius : 12) + 'px'
}

export default function Photo({
  shape = 'rounded',
  radius = 12,
  src,
  placeholder = '사진',
  fit = 'cover',
  style,
}) {
  const [failed, setFailed] = React.useState(false)
  const br = radiusFor(shape, radius)
  const show = src && !failed

  return (
    <div style={{
      position: 'relative', overflow: 'hidden', borderRadius: br,
      background: 'rgba(0,0,0,.04)', ...style,
    }}>
      {show ? (
        <img src={src} alt={placeholder} draggable="false" onError={() => setFailed(true)}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: fit, objectPosition: '50% 50%', display: 'block', userSelect: 'none',
          }} />
      ) : (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 6, textAlign: 'center',
          padding: 12, color: 'rgba(0,0,0,.4)',
          font: "12px/1.3 'Gowun Dodum', system-ui, sans-serif",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .4 }}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
          </svg>
          <span style={{ maxWidth: '90%' }}>{placeholder}</span>
        </div>
      )}
    </div>
  )
}
