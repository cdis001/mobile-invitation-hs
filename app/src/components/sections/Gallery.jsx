// 사진 갤러리 (Gallery) — swipeable carousel of 5 photo slots.
// The lock-and-set pattern keeps the active index correct in both real
// browsers (smooth scroll) and frozen-timeline preview contexts (click sets
// index immediately; the scroll listener is suppressed for 600ms).

import React from 'react'
import { Ornament } from '../Florals.jsx'
import Photo from '../Photo.jsx'
import { PHOTOS } from '../../data.js'
import { Eyebrow, SANS, KRSANS } from './shared.jsx'

// Gallery photo URLs are managed in data.js (PHOTOS.gallery).
const SLIDES = PHOTOS.gallery

export default function Gallery({ th, t }) {
  const trackRef = React.useRef(null)
  const lockRef = React.useRef(0)
  const [idx, setIdx] = React.useState(0)

  const go = (n) => {
    const tr = trackRef.current
    if (!tr) return
    const next = Math.max(0, Math.min(SLIDES.length - 1, n))
    lockRef.current = Date.now() + 600          // ignore onScroll while animating
    setIdx(next)
    tr.scrollTo({ left: next * tr.clientWidth, behavior: 'smooth' })
  }
  const onScroll = () => {
    const tr = trackRef.current
    if (!tr || Date.now() < lockRef.current) return
    setIdx(Math.round(tr.scrollLeft / tr.clientWidth))
  }

  const arrow = (dir) => {
    const disabled = dir < 0 ? idx === 0 : idx === SLIDES.length - 1
    return (
      <button onClick={() => go(idx + dir)} disabled={disabled}
        aria-label={dir < 0 ? '이전' : '다음'}
        style={{
          width: 40, height: 40, borderRadius: '50%', flex: '0 0 auto',
          cursor: disabled ? 'default' : 'pointer',
          border: '1px solid ' + th.ruleHair, background: th.surface, color: th.accent,
          display: 'grid', placeItems: 'center', opacity: disabled ? 0.32 : 1,
          transition: 'opacity .3s var(--ease-soft), transform .15s var(--ease-soft)',
          boxShadow: '0 6px 16px -10px rgba(43,37,33,.45)', fontSize: 0,
        }}
        onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.92)' }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: dir < 0 ? 'none' : 'scaleX(-1)' }}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    )
  }

  return (
    <section data-screen-label="갤러리" style={{
      position: 'relative', background: th.band, padding: '76px 28px 80px',
      textAlign: 'center', overflow: 'hidden',
    }}>
      <Eyebrow th={th} t={t}>우리의 순간들</Eyebrow>
      <div style={{ margin: '22px 0 28px' }}><Ornament theme={th} w={58} /></div>

      {/* swipe track */}
      <div ref={trackRef} onScroll={onScroll} className="carousel-track" style={{
        display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory',
        borderRadius: 16, gap: 0,
      }}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{ flex: '0 0 100%', scrollSnapAlign: 'center',
            padding: 2, boxSizing: 'border-box' }}>
            <Photo src={s.src} shape="rounded" radius={14} placeholder={s.label}
              style={{ width: '100%', height: 300, display: 'block', marginBottom: 8 }} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* controls: arrows + counter + dots */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 16, marginTop: 18 }}>
        {arrow(-1)}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 8, minWidth: 92 }}>
          <div style={{ fontFamily: SANS, fontSize: 12 * t.fontScale, letterSpacing: '0.18em',
            color: th.ink, fontWeight: 500 }}>
            {String(idx + 1).padStart(2, '0')}
            <span style={{ color: th.muted }}> / {String(SLIDES.length).padStart(2, '0')}</span>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            {SLIDES.map((s, i) => (
              <button key={i} onClick={() => go(i)} aria-label={(i + 1) + '번 사진'}
                style={{ width: i === idx ? 18 : 7, height: 7, borderRadius: 999, border: 0,
                  cursor: 'pointer', padding: 0, background: i === idx ? th.accent : th.ruleHair,
                  transition: 'width .3s var(--ease-soft), background .3s var(--ease-soft)' }} />
            ))}
          </div>
        </div>
        {arrow(1)}
      </div>

      <div style={{ marginTop: 18, fontFamily: KRSANS, fontSize: 11 * t.fontScale,
        color: th.muted, letterSpacing: (0.18 + t.spacing) + 'em' }}>
        좌우로 넘겨보세요
      </div>
    </section>
  )
}
