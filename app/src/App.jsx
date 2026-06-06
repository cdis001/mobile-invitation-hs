// App — assembles the 안내장: responsive device shell, colorway switcher,
// and the scrolling sections. Content/config comes from data.js (INVITATION);
// the only live state is the selected colorway.

import { useState } from 'react'
import { THEMES, INVITATION, DEFAULT_COLORWAY } from './data.js'
import ColorwaySwitcher from './components/ColorwaySwitcher.jsx'
import Cover from './components/sections/Cover.jsx'
import Greeting from './components/sections/Greeting.jsx'
import Couple from './components/sections/Couple.jsx'
import Gallery from './components/sections/Gallery.jsx'
import Closing from './components/sections/Closing.jsx'

export default function App() {
  const [colorway, setColorway] = useState(DEFAULT_COLORWAY)
  const th = THEMES[colorway] || THEMES.ivory
  const t = INVITATION   // content + presentation config (fixed)

  return (
    <div className="page" style={{ ['--bezel']: th.bezel }}>
      <header className="topbar">
        <div className="brand" style={{ color: th.names }}>
          Song&rsquo;s<small>MOBILE&nbsp;&nbsp;INVITATION</small>
        </div>
        <ColorwaySwitcher value={colorway} onChange={setColorway} />
      </header>

      <div className="device">
        <div className="screen" style={{ background: th.bg, color: th.ink }}>
          <div className="notch" />
          <div className="scroll">
            <Cover th={th} t={t} />
            <Greeting th={th} t={t} />
            <Couple th={th} t={t} />
            <Gallery th={th} t={t} />
            <Closing th={th} t={t} />
          </div>
        </div>
      </div>
    </div>
  )
}
