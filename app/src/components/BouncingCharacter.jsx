// BouncingCharacter — a round little character that bounces in from the left
// with squash-and-stretch and settles in the center when the Closing section
// scrolls into view. Pure inline SVG + CSS (keyframes in index.css); no deps.
// `ball`/`outline` set the body colors; `delay` staggers two of them so a pair
// reads as bouncing in together. Swap the <svg> for a Lottie player later.

import { useEffect, useRef, useState } from 'react'

export default function BouncingCharacter({
  th, width = 110, ball, outline, delay = 0, style, playKey = 0, onReplay,
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

  return (
    <div ref={ref} className={'bouncer-stage' + (go ? ' go' : '')} aria-hidden="true"
      onClick={onReplay}
      style={{ '--bounce-delay': delay + 's', cursor: 'pointer', ...style }}>
      {/* key={playKey} remounts the animated subtree so the CSS animation
          restarts from the beginning on each replay */}
      <div className="bouncer" key={playKey}>
        <svg width={width} height={width * 0.97} viewBox="0 0 120 116" fill="none">
          {/* ground shadow (pulses with the bounce) */}
          <ellipse className="shadow" cx="60" cy="107" rx="26" ry="4.5"
            fill={face} opacity="0.16" />

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
  )
}
