// BouncingCharacter — a round little character that bounces in from the left
// with squash-and-stretch and settles in the center when the Closing section
// scrolls into view. Pure inline SVG + CSS (keyframes in index.css); no deps.
//
// `ball`/`outline` set the body colors; `delay` staggers a pair so they read as
// bouncing in together; `playKey` (changed by a click) remounts the animated
// subtree to replay from the start. `role` adds a post-bounce gag: 'hitter'
// throws a punch, 'hittee' recoils with an impact spark.

import { useEffect, useRef, useState } from 'react'

export default function BouncingCharacter({
  th, width = 110, ball, outline, delay = 0, style, playKey = 0, onReplay, role,
}) {
  const ref = useRef(null)
  const [go, setGo] = useState(false)

  // Trigger the bounce-in the first time it scrolls into view.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setGo(true); io.disconnect() } },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const body = ball || th.accent     // gold body by default
  const line = outline || th.names   // gold-deep outline
  const face = th.ink                // petrol face
  const spark = th.accent            // impact spark

  return (
    <div ref={ref} className={'bouncer-stage' + (go ? ' go' : '')} onClick={onReplay}
      aria-hidden="true"
      style={{ '--bounce-delay': delay + 's', cursor: 'pointer', ...style }}>
      {/* key={playKey} remounts the animated subtree so every animation
          (bounce-in and the hit gag) restarts from the beginning on replay */}
      <div className="bouncer" key={playKey}>
        <div className={'actor' + (role ? ' ' + role : '')}>
          <svg width={width} height={width * 0.97} viewBox="0 0 120 116" fill="none">
            {/* ground shadow (pulses with the bounce) */}
            <ellipse className="shadow" cx="60" cy="107" rx="26" ry="4.5"
              fill={face} opacity="0.16" />

            {/* impact spark — only on the character being hit */}
            {role === 'hittee' && (
              <g className="impact" stroke={spark} strokeWidth="2.2" strokeLinecap="round">
                <line x1="86" y1="68" x2="95" y2="61" />
                <line x1="86" y1="68" x2="97" y2="70" />
                <line x1="86" y1="68" x2="92" y2="79" />
                <line x1="86" y1="68" x2="83" y2="57" />
              </g>
            )}

            <g className="hopper">
              {/* body */}
              <circle cx="60" cy="74" r="28" fill={body} stroke={line} strokeWidth="2" />
              {/* shine */}
              <ellipse cx="50" cy="62" rx="6" ry="4" fill="#fff" opacity="0.35" />
              {/* cheeks */}
              <circle cx="47" cy="80" r="3.2" fill="#fff" opacity="0.30" />
              <circle cx="73" cy="80" r="3.2" fill="#fff" opacity="0.30" />
              {/* eyes */}
              <circle cx="52" cy="72" r="2.7" fill={face} />
              <circle cx="68" cy="72" r="2.7" fill={face} />
              {/* smile */}
              <path d="M52 80 Q60 88 68 80" fill="none" stroke={face}
                strokeWidth="2.4" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
