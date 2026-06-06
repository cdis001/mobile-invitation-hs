// ImageSlot.jsx — user-fillable photo placeholder (React port of <image-slot>).
//
// Fill: drag an image file onto the slot, or click to browse. The image is
// downscaled to a WebP data-URL and persisted to localStorage keyed by `id`
// as { u, s, x, y } (url + crop), so both the photo and its framing survive
// reloads. Every slot needs a stable, unique `id`.
//
// Reframe (fit=cover only): double-click a filled slot to adjust the crop —
// the full image spills past the mask (translucent ghost), drag to reposition,
// corner-drag to resize (aspect-locked about the opposite corner), wheel to
// zoom toward the cursor. Escape or click-outside commits; double-click again
// also commits. Crop math mirrors the original web component: width/height/
// left/top are all frame-%, so a responsive resize keeps the same crop.

import React from 'react'

const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif']
const MAX_DIM = 1200
const S_MAX = 5
const KEY = (id) => `image-slot:${id}`

const clampS = (s) => Math.max(1, Math.min(S_MAX, s))
const num = (v, d) => (Number.isFinite(v) ? v : d)

// ── persistence ─────────────────────────────────────────────────────────────
function readStore(id) {
  try {
    const raw = localStorage.getItem(KEY(id))
    if (!raw) return null
    if (raw[0] === '{') {
      const o = JSON.parse(raw)
      if (o && typeof o.u === 'string') return { u: o.u, s: num(o.s, 1), x: num(o.x, 0), y: num(o.y, 0) }
      return null
    }
    return { u: raw, s: 1, x: 0, y: 0 } // legacy bare data-url
  } catch { return null }
}
function writeStore(id, val) {
  try {
    if (val) localStorage.setItem(KEY(id), JSON.stringify(val))
    else localStorage.removeItem(KEY(id))
  } catch { /* private mode / quota — value still lives in state for the session */ }
}

// Encode through a canvas so localStorage carries resized bytes, not the raw
// upload. Longest side capped at 2× the slot's rendered width (retina), MAX_DIM.
async function toDataUrl(file, targetW) {
  const bitmap = await createImageBitmap(file)
  try {
    const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM)
    const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height))
    const w = Math.max(1, Math.round(bitmap.width * scale))
    const h = Math.max(1, Math.round(bitmap.height * scale))
    const canvas = document.createElement('canvas')
    canvas.width = w; canvas.height = h
    canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h)
    return canvas.toDataURL('image/webp', 0.85)
  } finally {
    bitmap.close && bitmap.close()
  }
}

// ── crop geometry ───────────────────────────────────────────────────────────
function radiusFor(shape, radius) {
  if (shape === 'circle') return '50%'
  if (shape === 'pill') return '9999px'
  return (Number.isFinite(radius) ? radius : 12) + 'px'
}

// Pan range on each axis is half the overflow past the frame edge.
function clampView(v, nat, box) {
  if (!nat || !box) return v
  const base = Math.max(box.w / nat.iw, box.h / nat.ih)
  const mx = Math.max(0, (nat.iw * base * v.s / box.w - 1) * 50)
  const my = Math.max(0, (nat.ih * base * v.s / box.h - 1) * 50)
  return { s: v.s, x: Math.max(-mx, Math.min(mx, v.x)), y: Math.max(-my, Math.min(my, v.y)) }
}

// Cover-baseline box, in frame-%. At s=1,x=0,y=0 this equals object-fit:cover,
// so there's no jump when geometry first becomes known. Null until both the
// image (naturalWidth) and the frame (ResizeObserver) have measured.
function coverBox(view, nat, box) {
  if (!nat || !box || !nat.iw || !nat.ih || !box.w || !box.h) return null
  const v = clampView(view, nat, box)
  const base = Math.max(box.w / nat.iw, box.h / nat.ih)
  const k = base * v.s
  return {
    width: (nat.iw * k / box.w * 100) + '%',
    height: (nat.ih * k / box.h * 100) + '%',
    left: (50 + v.x) + '%',
    top: (50 + v.y) + '%',
  }
}

const HANDLES = ['nw', 'ne', 'sw', 'se']
const handleCursor = { nw: 'nwse-resize', ne: 'nesw-resize', sw: 'nesw-resize', se: 'nwse-resize' }

export default function ImageSlot({
  id,
  shape = 'rounded',
  radius = 12,
  placeholder = '사진을 끌어다 놓아주세요',
  fit = 'cover',
  style,
}) {
  const [stored, setStored] = React.useState(() => readStore(id))
  const [view, setView] = React.useState(() => {
    const s = stored
    return s ? { s: s.s, x: s.x, y: s.y } : { s: 1, x: 0, y: 0 }
  })
  const [over, setOver] = React.useState(false)
  const [err, setErr] = React.useState('')
  const [reframe, setReframe] = React.useState(false)
  const [nat, setNat] = React.useState(null) // { iw, ih }
  const [box, setBox] = React.useState(null) // { w, h }

  const rootRef = React.useRef(null)
  const inputRef = React.useRef(null)
  const depthRef = React.useRef(0)
  const genRef = React.useRef(0)
  // Refs mirror state so the lifetime-of-a-drag pointer handlers read fresh
  // values without re-subscribing.
  const viewRef = React.useRef(view); viewRef.current = view
  const natRef = React.useRef(nat); natRef.current = nat
  const boxRef = React.useRef(box); boxRef.current = box
  const storedRef = React.useRef(stored); storedRef.current = stored

  const url = stored?.u || ''
  const filled = !!url
  const canReframe = filled && fit === 'cover'

  // Track the frame size so the crop stays in frame-% (survives responsive
  // resize). The frame fills the root via inset:0, so the root's box is it.
  React.useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      setBox({ w: cr.width, h: cr.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const persist = (val) => { writeStore(id, val); setStored(val) }

  const ingest = async (file) => {
    setErr('')
    if (!file || ACCEPT.indexOf(file.type) < 0) {
      setErr('PNG · JPEG · WebP · AVIF 이미지를 올려주세요.')
      return
    }
    const gen = ++genRef.current
    try {
      const w = rootRef.current?.clientWidth || MAX_DIM
      const u = await toDataUrl(file, w)
      if (gen !== genRef.current) return
      setReframe(false)
      setView({ s: 1, x: 0, y: 0 })
      persist({ u, s: 1, x: 0, y: 0 })
    } catch {
      if (gen !== genRef.current) return
      setErr('이미지를 읽지 못했습니다.')
    }
  }

  const onDrop = (e) => {
    e.preventDefault()
    depthRef.current = 0
    setOver(false)
    const f = e.dataTransfer?.files?.[0]
    if (f) ingest(f)
  }

  // ── reframe enter / exit ───────────────────────────────────────────────────
  const enterReframe = () => {
    const s = storedRef.current
    setView({ s: s?.s ?? 1, x: s?.x ?? 0, y: s?.y ?? 0 })
    setReframe(true)
  }
  const exitReframe = (commit) => {
    setReframe(false)
    if (commit && storedRef.current) {
      const v = viewRef.current
      persist({ u: storedRef.current.u, s: v.s, x: v.x, y: v.y })
    }
  }
  const onDoubleClick = () => {
    if (!canReframe) return
    if (reframe) exitReframe(true)
    else enterReframe()
  }

  // Outside-click + Escape commit, and wheel-zoom — bound natively while
  // reframing (wheel needs passive:false to preventDefault).
  React.useEffect(() => {
    if (!reframe) return
    const root = rootRef.current
    const onDocDown = (e) => { if (root && !root.contains(e.target)) exitReframe(true) }
    const onKey = (e) => { if (e.key === 'Escape') exitReframe(true) }
    const onWheel = (e) => {
      e.preventDefault()
      const r = root.getBoundingClientRect()
      const cx = (e.clientX - r.left) / r.width * 100 - 50
      const cy = (e.clientY - r.top) / r.height * 100 - 50
      const prev = viewRef.current.s
      const next = clampS(prev * Math.pow(1.0015, -e.deltaY))
      if (next === prev) return
      const k = next / prev
      const nv = clampView(
        { s: next, x: cx * (1 - k) + viewRef.current.x * k, y: cy * (1 - k) + viewRef.current.y * k },
        natRef.current, boxRef.current)
      viewRef.current = nv; setView(nv)
    }
    document.addEventListener('pointerdown', onDocDown, true)
    document.addEventListener('keydown', onKey, true)
    root.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      document.removeEventListener('pointerdown', onDocDown, true)
      document.removeEventListener('keydown', onKey, true)
      root.removeEventListener('wheel', onWheel, { passive: false })
    }
    // exitReframe/persist close over stored via refs, so reframe is the only dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reframe])

  // Pan (drag anywhere on the spill) or resize (drag a corner handle). Offsets
  // are frame-% in viewport-px math so an ancestor transform:scale wouldn't
  // break it. Anchored at the OPPOSITE corner, aspect-locked.
  const onSpillPointerDown = (e) => {
    if (e.button !== 0 || !reframe) return
    e.preventDefault(); e.stopPropagation()
    const rect = rootRef.current.getBoundingClientRect()
    const fw = rect.width || 1, fh = rect.height || 1
    const iw = natRef.current?.iw || 1, ih = natRef.current?.ih || 1
    const v0 = viewRef.current
    const corner = e.target.getAttribute && e.target.getAttribute('data-c')
    let move
    if (corner) {
      const base = Math.max(fw / iw, fh / ih)
      const sx = corner.includes('e') ? 1 : -1
      const sy = corner.includes('s') ? 1 : -1
      const s0 = v0.s
      const w0 = iw * base * s0, h0 = ih * base * s0
      const cx0 = (50 + v0.x) / 100 * fw, cy0 = (50 + v0.y) / 100 * fh
      const ox = cx0 - sx * w0 / 2, oy = cy0 - sy * h0 / 2
      const diag0 = Math.hypot(w0, h0)
      const ux = sx * w0 / diag0, uy = sy * h0 / diag0
      move = (ev) => {
        const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy
        const s = clampS(s0 * proj / diag0)
        const d = diag0 * s / s0
        const nv = clampView(
          { s, x: (ox + ux * d / 2) / fw * 100 - 50, y: (oy + uy * d / 2) / fh * 100 - 50 },
          natRef.current, boxRef.current)
        viewRef.current = nv; setView(nv)
      }
    } else {
      const start = { px: e.clientX, py: e.clientY, x: v0.x, y: v0.y }
      move = (ev) => {
        const nv = clampView(
          { s: v0.s, x: start.x + (ev.clientX - start.px) / fw * 100, y: start.y + (ev.clientY - start.py) / fh * 100 },
          natRef.current, boxRef.current)
        viewRef.current = nv; setView(nv)
      }
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  // ── styles ──────────────────────────────────────────────────────────────────
  const br = radiusFor(shape, radius)
  const cb = fit === 'cover' ? coverBox(view, nat, box) : null
  const imgStyle = cb
    ? { position: 'absolute', maxWidth: 'none', ...cb, transform: 'translate(-50%,-50%)',
        display: 'block', userSelect: 'none' }
    : { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit,
        objectPosition: '50% 50%', display: 'block' }

  return (
    <div
      ref={rootRef}
      onClick={() => { if (!filled) inputRef.current?.click() }}
      onDoubleClick={onDoubleClick}
      onDragEnter={(e) => { e.preventDefault(); depthRef.current++; setOver(true) }}
      onDragOver={(e) => { e.preventDefault(); if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy' }}
      onDragLeave={() => { if (--depthRef.current <= 0) { depthRef.current = 0; setOver(false) } }}
      onDrop={onDrop}
      style={{
        position: 'relative', borderRadius: br,
        cursor: filled ? (canReframe ? 'default' : 'default') : 'pointer',
        ...style,
        ...(reframe ? { zIndex: 10 } : null),
      }}
    >
      {/* FRAME — clipped to the mask */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: br,
        background: 'rgba(0,0,0,.04)',
        outline: over ? '2px solid #C29A63' : 'none', outlineOffset: -2,
        boxShadow: reframe ? '0 0 0 2px #C29A63' : undefined,
      }}>
        {filled ? (
          <img src={url} alt="" draggable="false" onLoad={(e) => {
            const im = e.currentTarget
            setNat({ iw: im.naturalWidth, ih: im.naturalHeight })
          }} style={imgStyle} />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 6, textAlign: 'center',
            padding: 12, color: 'rgba(0,0,0,.5)',
            font: "13px/1.3 'Gowun Dodum', system-ui, sans-serif",
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .45 }}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
            </svg>
            <span style={{ maxWidth: '90%', fontWeight: 500 }}>{placeholder}</span>
            <span style={{ fontSize: 11, opacity: .8 }}>또는 <u>파일 선택</u></span>
          </div>
        )}
        {!filled && (
          <span style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: br,
            border: `1.5px dashed ${over ? '#C29A63' : 'rgba(0,0,0,.25)'}`,
          }} />
        )}
      </div>

      {/* SPILL — full image past the mask, with pan + resize handles */}
      {reframe && filled && cb && (
        <div onPointerDown={onSpillPointerDown} style={{
          position: 'absolute', ...cb, transform: 'translate(-50%,-50%)',
          cursor: 'grab', touchAction: 'none', zIndex: 1,
        }}>
          <img src={url} alt="" draggable="false" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35,
            pointerEvents: 'none', userSelect: 'none',
            boxShadow: '0 0 0 1px rgba(0,0,0,.2), 0 12px 32px rgba(0,0,0,.2)',
          }} />
          {HANDLES.map((c) => (
            <span key={c} data-c={c} style={{
              position: 'absolute', width: 12, height: 12, borderRadius: '50%',
              background: '#fff', boxShadow: '0 0 0 1.5px #C29A63, 0 1px 3px rgba(0,0,0,.3)',
              transform: 'translate(-50%,-50%)', cursor: handleCursor[c],
              left: c.includes('w') ? 0 : '100%', top: c.includes('n') ? 0 : '100%',
            }} />
          ))}
        </div>
      )}

      {/* hover controls — replace / remove (hidden while reframing) */}
      {filled && !reframe && (
        <div className="slot-ctl" style={{ position: 'absolute', right: 8, bottom: 8, display: 'flex', gap: 6 }}>
          <button type="button" onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }} style={ctlBtn}>교체</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); enterReframe() }} style={ctlBtn}>위치</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); persist(null) }} style={ctlBtn}>삭제</button>
        </div>
      )}

      {/* reframe hint */}
      {reframe && (
        <div style={{
          position: 'absolute', left: '50%', bottom: -28, transform: 'translateX(-50%)',
          whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 2,
          background: 'rgba(0,0,0,.72)', color: '#fff', borderRadius: 6, padding: '4px 9px',
          font: "11px/1.2 'Gowun Dodum', system-ui, sans-serif",
        }}>드래그 위치 · 모서리/휠 크기 · Esc 완료</div>
      )}

      {err && (
        <div style={{
          position: 'absolute', left: 8, right: 8, bottom: 8, color: '#b3261e', fontSize: 11,
          background: 'rgba(255,255,255,.85)', padding: '4px 6px', borderRadius: 5, pointerEvents: 'none',
        }}>{err}</div>
      )}

      <input ref={inputRef} type="file" accept={ACCEPT.join(',')} hidden
        onChange={(e) => { const f = e.target.files?.[0]; if (f) ingest(f); e.target.value = '' }} />
    </div>
  )
}

const ctlBtn = {
  appearance: 'none', border: 0, borderRadius: 6, padding: '5px 10px', cursor: 'pointer',
  background: 'rgba(0,0,0,.65)', color: '#fff',
  font: "11px/1 'Gowun Dodum', system-ui, sans-serif",
}
