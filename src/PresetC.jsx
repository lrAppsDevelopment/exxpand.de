import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight, Zap, TrendingUp, Users, Star,
  Calendar, CheckCircle, Menu, X,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS — Brutalist Signal (Preset C)
───────────────────────────────────────────────────────────────────────────── */
const T = {
  paper:    '#E8E4DD',
  red:      '#E63B2E',
  offwhite: '#F5F3EE',
  black:    '#111111',
  ink:      '#2C2C2C',
  redHover: '#f05a50',
}

const SANS  = "'Space Grotesk', system-ui, sans-serif"
const SERIF = "'DM Serif Display', Georgia, serif"
const MONO  = "'Space Mono', 'Courier New', monospace"

const CTA_URL   = 'https://cal.eu/exxpand/potenzialanalyse'
const CTA_LABEL = 'Kostenlose Potenzialanalyse'

const CLIENT_LOGOS = [
  { name: 'Würth',                      src: '/logos/wuerth.svg' },
  { name: 'TDK',                        src: '/logos/tdk.svg' },
  { name: 'PLANSEE',                    src: '/logos/plansee.png' },
  { name: 'Christ Electronic Systems',  src: '/logos/christ.svg' },
  { name: 'Webasto',                    src: '/logos/webasto.svg' },
  { name: 'Zollner Elektronik',         src: '/logos/zollner.svg' },
  { name: 'BMK Group',                  src: '/logos/bmk.png' },
  { name: 'acal bfi',                   src: '/logos/acal-bfi.svg' },
  { name: 'Spang Engineered Solutions', src: '/logos/spang.svg' },
]

function CtaLink({
  className = '',
  style = {},
  iconSize = 14,
  children = CTA_LABEL,
  bgHover = T.redHover,
  btnBgClassName = 'rounded-full',
  onClick,
}) {
  return (
    <a
      href={CTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`btn-magnetic inline-flex items-center gap-2 ${className}`}
      style={style}
    >
      <span className={`btn-bg ${btnBgClassName}`} style={{ backgroundColor: bgHover }} />
      <span className="relative z-10">{children}</span>
      <ArrowRight size={iconSize} className="relative z-10 shrink-0" />
    </a>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Leistungen',  href: '#features' },
    { label: 'Philosophie', href: '#philosophy' },
    { label: 'Prozess',     href: '#protocol' },
    { label: 'Referenzen',  href: '#testimonials' },
  ]

  const scrollTo = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const textColor = scrolled ? T.black : '#FAF8F5'

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-6 md:px-8 py-3 flex items-center gap-6 md:gap-8 w-max max-w-[96vw] ${
          scrolled
            ? 'backdrop-blur-xl border shadow-lg'
            : 'bg-transparent'
        }`}
        style={scrolled ? {
          backgroundColor: `${T.offwhite}CC`,
          borderColor: `${T.black}18`,
          fontFamily: SANS,
        } : { fontFamily: SANS }}
      >
        <a href="#" className="font-black tracking-tighter text-lg select-none shrink-0" style={{ color: textColor }}>
          EXX<span style={{ color: T.red }}>PAND</span>
        </a>

        <div className="hidden md:flex items-center gap-6 shrink-0">
          {links.map(l => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="link-lift text-sm font-medium transition-colors"
              style={{ color: scrolled ? `${T.black}99` : '#FAF8F5CC', fontFamily: SANS }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <CtaLink
          className="hidden md:flex text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap shrink-0"
          style={{ backgroundColor: T.red, color: '#FAF8F5', fontFamily: SANS }}
          bgHover={T.redHover}
        />

        <button
          className="md:hidden"
          style={{ color: scrolled ? T.black : '#FAF8F5' }}
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8"
          style={{ background: `${T.offwhite}F5`, fontFamily: SANS }}
        >
          {links.map(l => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="text-2xl font-semibold transition-colors"
              style={{ color: T.black }}
            >
              {l.label}
            </button>
          ))}
          <CtaLink
            className="text-base font-semibold px-8 py-4 rounded-full mt-4"
            style={{ backgroundColor: T.red, color: '#FAF8F5', fontFamily: SANS }}
            iconSize={18}
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────────── */
function Hero() {
  const containerRef = useRef(null)
  const headlineRef  = useRef(null)
  const subRef       = useRef(null)
  const ctaRef       = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(headlineRef.current?.children || [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12 }
      )
      .fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.5'
      )
      .fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-end pb-20 md:pb-0"
    >
      {/* Brutalist/industrial hero image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')`,
        }}
      />
      {/* Primary gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${T.black} 0%, ${T.black}CC 40%, ${T.black}66 70%, transparent 100%)`,
        }}
      />
      {/* Side gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${T.black}BB 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          <div ref={headlineRef}>
            <p
              className="text-sm tracking-[0.25em] uppercase mb-4"
              style={{ color: T.red, fontFamily: MONO }}
            >
              Top Performance Akademie
            </p>
            <h1
              className="font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-2"
              style={{ color: '#FAF8F5', fontFamily: SANS }}
            >
              Steuern Sie das
            </h1>
            <h1
              className="italic font-normal leading-none mb-6"
              style={{
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                color: T.red,
                lineHeight: 0.9,
                fontFamily: SERIF,
              }}
            >
              System.
            </h1>
          </div>

          <p
            ref={subRef}
            className="text-lg md:text-xl max-w-xl leading-relaxed mb-10"
            style={{ color: '#FAF8F5B3' }}
          >
            Mit dem EXXPAND Masterplan erreichen Sie in 6 Monaten mehr als Ihre Wettbewerber in 5 Jahren.
            Persönlich. Messbar. Unaufhaltsam.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
            <CtaLink
              className="gap-3 text-base font-semibold px-8 py-4 rounded-full"
              style={{ backgroundColor: T.red, color: '#FAF8F5', fontFamily: SANS }}
              iconSize={18}
            />
          </div>
        </div>

        {/* Trust logo bar */}
        <div
          className="hidden md:block w-full border-t mt-16 lg:mt-20 mb-16 lg:mb-20 py-6 lg:py-7"
          style={{ borderColor: `#FFFFFF20`, background: `${T.black}E6` }}
        >
          <div className="flex w-full min-w-0 flex-nowrap items-center justify-between gap-x-2 lg:gap-x-3">
            {CLIENT_LOGOS.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                className={`trust-logo h-7 lg:h-8 w-auto object-contain object-center shrink-0 ${
                  logo.name === 'Würth'                     ? 'max-w-[100px] lg:max-w-[110px]' :
                  logo.name === 'PLANSEE'                   ? 'max-w-[92px] lg:max-w-[100px]' :
                  logo.name === 'Christ Electronic Systems' ? 'max-w-[88px] lg:max-w-[96px]' :
                  'max-w-[68px] lg:max-w-[76px]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE CARD 1 — Diagnostic Shuffler
───────────────────────────────────────────────────────────────────────────── */
function ShufflerCard() {
  const items = [
    { label: 'Ziel definiert',    sub: 'Glasklare Vision & KPIs' },
    { label: 'Engpässe gelöst',   sub: 'Hindernisse eliminiert' },
    { label: 'Gipfel erreicht',   sub: 'Messbare Ergebnisse' },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const id = setInterval(() => {
      setStack(prev => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="rounded-4xl p-8 flex flex-col gap-6 border h-full"
      style={{ background: T.offwhite, borderColor: `${T.black}18` }}
    >
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg" style={{ color: T.black, fontFamily: SANS }}>
          Umsetzungsgeschwindigkeit
        </span>
        <Zap size={18} style={{ color: T.red }} />
      </div>
      <p className="text-sm" style={{ color: `${T.ink}99`, fontFamily: SANS }}>
        In 6 Monaten weiter als Wettbewerber in 5 Jahren.
      </p>
      <div className="relative h-44 flex flex-col justify-end gap-2">
        {stack.map((item, i) => (
          <div
            key={item.label}
            className="card-enter absolute w-full rounded-3xl p-4 border flex justify-between items-center"
            style={{
              bottom: `${i * 14}px`,
              zIndex: stack.length - i,
              background: i === 0 ? T.black : T.paper,
              borderColor: i === 0 ? T.red : `${T.black}20`,
              transform: `scale(${1 - i * 0.04})`,
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              opacity: 1 - i * 0.25,
            }}
          >
            <div>
              <p
                className="font-semibold text-sm"
                style={{ color: i === 0 ? '#FAF8F5' : T.black, fontFamily: SANS }}
              >
                {item.label}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: i === 0 ? '#FAF8F580' : `${T.ink}80`, fontFamily: MONO }}
              >
                {item.sub}
              </p>
            </div>
            {i === 0 && <CheckCircle size={18} style={{ color: T.red }} />}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE CARD 2 — Telemetry Typewriter
───────────────────────────────────────────────────────────────────────────── */
function TypewriterCard() {
  const messages = [
    '> Umsatz +38% in 12 Monaten',
    '> Rohertrag +14% optimiert',
    '> Neukunden-Pipeline ×3',
    '> High Probability Selling aktiv',
    '> KPI-Dashboard live',
    '> Ziel: Marktführerschaft',
  ]
  const [displayed, setDisplayed] = useState('')
  const [msgIdx, setMsgIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const msg = messages[msgIdx]
    if (charIdx < msg.length) {
      const t = setTimeout(() => {
        setDisplayed(msg.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      }, 45)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setMsgIdx(i => (i + 1) % messages.length)
        setCharIdx(0)
        setDisplayed('')
      }, 1800)
      return () => clearTimeout(t)
    }
  }, [charIdx, msgIdx])

  return (
    <div
      className="rounded-4xl p-8 flex flex-col gap-6 border h-full"
      style={{ background: T.black, borderColor: `${T.black}` }}
    >
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg" style={{ color: '#FAF8F5', fontFamily: SANS }}>
          Umsatzwachstum
        </span>
        <TrendingUp size={18} style={{ color: T.red }} />
      </div>
      <p className="text-sm" style={{ color: '#FAF8F560', fontFamily: SANS }}>
        Steigern Sie Ihren Umsatz um 25–40 % in 12 Monaten.
      </p>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#4ade80' }} />
        <span className="text-xs" style={{ color: '#4ade80', fontFamily: MONO }}>LIVE FEED</span>
      </div>
      <div
        className="flex-1 rounded-2xl p-4 text-sm min-h-[120px]"
        style={{ background: `${T.ink}60`, color: T.red, fontFamily: MONO }}
      >
        <p className="leading-relaxed">
          {displayed}
          <span className="cursor-blink ml-0.5" style={{ color: T.red }}>█</span>
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE CARD 3 — Scheduler
───────────────────────────────────────────────────────────────────────────── */
function SchedulerCard() {
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
  const [activeDay, setActiveDay] = useState(2)
  const [cursorPos, setCursorPos] = useState(0)

  useEffect(() => {
    let step = 0
    const id = setInterval(() => {
      step = (step + 1) % days.length
      setCursorPos(step)
      setActiveDay(step)
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="rounded-4xl p-8 flex flex-col gap-6 border h-full"
      style={{ background: T.offwhite, borderColor: `${T.black}18` }}
    >
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg" style={{ color: T.black, fontFamily: SANS }}>
          High Performance Team
        </span>
        <Users size={18} style={{ color: T.red }} />
      </div>
      <p className="text-sm" style={{ color: `${T.ink}99`, fontFamily: SANS }}>
        Mitarbeiterbindung durch klare Zielfokussierung &amp; Teamkultur.
      </p>
      <div className="rounded-2xl p-5 border" style={{ background: T.black, borderColor: `${T.ink}80` }}>
        <div className="flex items-center gap-1.5 mb-4">
          <Calendar size={14} style={{ color: T.red }} />
          <span className="text-xs" style={{ color: '#FAF8F560', fontFamily: MONO }}>TEAM SPRINT — KW 22</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d, i) => (
            <div
              key={d}
              className="flex flex-col items-center gap-1.5 transition-all duration-300"
              style={{ transform: i === cursorPos ? 'scale(1.15)' : 'scale(1)' }}
            >
              <span className="text-xs" style={{ color: '#FAF8F550', fontFamily: MONO }}>{d}</span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  background: i === activeDay ? T.red : `${T.ink}80`,
                  transform: i === cursorPos ? 'scale(0.95)' : 'scale(1)',
                }}
              >
                {i === activeDay && <CheckCircle size={14} style={{ color: '#FAF8F5' }} />}
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-4 rounded-lg px-4 py-2 text-center text-xs transition-all duration-300"
          style={{
            background: `${T.red}25`,
            color: T.red,
            border: `1px solid ${T.red}40`,
            fontFamily: MONO,
          }}
        >
          Ziele gesetzt · Performance aktiviert
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURES SECTION
───────────────────────────────────────────────────────────────────────────── */
function Features() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pc-feature-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        }
      )
      gsap.fromTo('.pc-feature-header',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="features"
      ref={ref}
      className="pt-0 pb-28 px-6 md:px-16 lg:px-24"
      style={{ background: T.offwhite }}
    >
      <div className="pc-feature-header max-w-2xl mb-16">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: T.red, fontFamily: MONO }}
        >
          Was wir bieten
        </p>
        <h2
          className="font-black text-4xl md:text-5xl leading-tight"
          style={{ color: T.black, fontFamily: SANS }}
        >
          Drei Dimensionen.{' '}
          <span className="italic font-normal" style={{ color: T.red, fontFamily: SERIF }}>
            Ein Gipfel.
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="pc-feature-card"><ShufflerCard /></div>
        <div className="pc-feature-card"><TypewriterCard /></div>
        <div className="pc-feature-card"><SchedulerCard /></div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PHILOSOPHY
───────────────────────────────────────────────────────────────────────────── */
function Philosophy() {
  const ref     = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.word-reveal') || []
      gsap.fromTo(words,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 70%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative py-36 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: T.black }}
    >
      {/* Concrete texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')`,
        }}
      />
      <div ref={textRef} className="relative z-10 max-w-5xl mx-auto">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-12"
          style={{ color: T.red, fontFamily: MONO }}
        >
          Unsere Philosophie
        </p>
        <p
          className="text-base md:text-lg mb-8 leading-relaxed"
          style={{ color: '#FAF8F550', fontFamily: SANS }}
        >
          {['Die', 'meisten', 'Berater', 'fokussieren', 'auf:'].map((w, i) => (
            <span key={i} className="word-reveal inline-block mr-2">{w}</span>
          ))}
          <br />
          {['Strategiepapiere,', 'PowerPoint-Decks', 'und', 'endlose', 'Konzepte.'].map((w, i) => (
            <span key={i} className="word-reveal inline-block mr-2">{w}</span>
          ))}
        </p>
        <p
          className="text-2xl md:text-3xl font-semibold mb-6"
          style={{ color: '#FAF8F570', fontFamily: SANS }}
        >
          {['Wir', 'fokussieren', 'auf:'].map((w, i) => (
            <span key={i} className="word-reveal inline-block mr-3">{w}</span>
          ))}
        </p>
        <div className="overflow-hidden">
          <p
            className="word-reveal italic font-normal leading-none"
            style={{
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              color: T.red,
              fontFamily: SERIF,
            }}
          >
            100 % Umsetzung.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: '5.000+', label: 'Branchenkontakte weltweit' },
            { n: '743',    label: 'Erfolgreiche Projekte' },
            { n: '25',     label: 'Jahre Expertise' },
            { n: '12.000', label: 'Bewegte Menschen' },
          ].map((s, i) => (
            <div key={i} className="word-reveal">
              <p
                className="font-black text-3xl md:text-4xl"
                style={{ color: T.red, fontFamily: SANS }}
              >
                {s.n}
              </p>
              <p
                className="text-xs mt-2 leading-relaxed"
                style={{ color: '#FAF8F540', fontFamily: MONO }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROTOCOL — Stacking Archive
───────────────────────────────────────────────────────────────────────────── */
function GeoAnimation() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-40">
      <circle cx="100" cy="100" r="70" fill="none" stroke={T.red} strokeWidth="1.5" className="rotate-geo" style={{ transformOrigin: '100px 100px' }} />
      <circle cx="100" cy="100" r="50" fill="none" stroke={T.red} strokeWidth="1"   className="rotate-geo-rev" style={{ transformOrigin: '100px 100px' }} />
      <circle cx="100" cy="100" r="30" fill="none" stroke={T.red} strokeWidth="0.5" className="rotate-geo"     style={{ transformOrigin: '100px 100px' }} />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1="100" y1="100"
          x2={100 + 70 * Math.cos((deg * Math.PI) / 180)}
          y2={100 + 70 * Math.sin((deg * Math.PI) / 180)}
          stroke={T.red} strokeWidth="0.5" opacity="0.4"
          className="rotate-geo"
          style={{ transformOrigin: '100px 100px' }}
        />
      ))}
    </svg>
  )
}

function ScanAnimation() {
  return (
    <div className="relative w-48 h-48 overflow-hidden opacity-40">
      <div className="grid grid-cols-8 grid-rows-8 gap-1 w-full h-full">
        {Array.from({ length: 64 }).map((_, i) => (
          <div key={i} className="rounded-sm" style={{ background: `${T.red}30` }} />
        ))}
      </div>
      <div
        className="scan-line absolute top-0 bottom-0 w-6 rounded"
        style={{
          background: `linear-gradient(to right, transparent, ${T.red}80, transparent)`,
          left: 0,
        }}
      />
    </div>
  )
}

function WaveAnimation() {
  return (
    <svg width="220" height="80" viewBox="0 0 220 80" className="opacity-60">
      <path
        d="M 0 40 Q 20 10 40 40 T 80 40 T 120 40 T 160 40 T 200 40 T 220 40"
        fill="none"
        stroke={T.red}
        strokeWidth="2"
        className="wave-dash"
      />
    </svg>
  )
}

const protocolSteps = [
  {
    step: '01',
    title: 'EXXPAND Masterplan',
    desc: 'Mit Vollgas in 6 Monaten weiter als Wettbewerber in 5 Jahren. Klare Ziele, konkrete Umsetzung, messbare Ergebnisse.',
    anim: <GeoAnimation />,
    bg: T.paper,
    dark: false,
  },
  {
    step: '02',
    title: 'EXXPAND Sales',
    desc: 'Machen Sie in 12 Monaten aus Ihrer Innovation eine hochprofitable Marke. High Performance Vertrieb. Positionierung. Umsatz.',
    anim: <ScanAnimation />,
    bg: T.black,
    dark: true,
  },
  {
    step: '03',
    title: 'EXXPAND Strategy',
    desc: 'In 24 Monaten zum Nischen-Marktführer. Machen Sie Ihr Unternehmen fit für die Zukunft — zukunftssicher, krisenfest, wachstumsstark.',
    anim: <WaveAnimation />,
    bg: T.offwhite,
    dark: false,
  },
]

function Protocol() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pc-protocol-header',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        }
      )
      gsap.fromTo('.pc-protocol-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="protocol"
      ref={ref}
      className="py-28 px-6 md:px-16 lg:px-24"
      style={{ background: T.paper }}
    >
      <div className="pc-protocol-header max-w-2xl mb-16">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: T.red, fontFamily: MONO }}
        >
          Die Programme
        </p>
        <h2
          className="font-black text-4xl md:text-5xl leading-tight"
          style={{ color: T.black, fontFamily: SANS }}
        >
          Ihr Weg.{' '}
          <span className="italic font-normal" style={{ color: T.red, fontFamily: SERIF }}>
            Drei Stufen.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {protocolSteps.map((s) => (
          <div
            key={s.step}
            className="pc-protocol-card rounded-4xl p-8 border flex flex-col gap-8 min-h-[360px] relative overflow-hidden group transition-all duration-500 hover:scale-[1.02]"
            style={{
              background: s.bg,
              borderColor: s.dark ? '#FFFFFF18' : `${T.black}18`,
            }}
          >
            <div className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none">
              {s.anim}
            </div>
            <div>
              <span className="text-sm" style={{ color: T.red, fontFamily: MONO }}>{s.step}</span>
            </div>
            <div className="mt-auto">
              <h3
                className="font-black text-2xl md:text-3xl mb-4"
                style={{ color: s.dark ? '#FAF8F5' : T.black, fontFamily: SANS }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: s.dark ? '#FAF8F560' : `${T.ink}99`, fontFamily: SANS }}
              >
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────────────────────────────────────── */
const testimonials = [
  { quote: 'Stephans Masterplan und Team Sales Performance Programm — ein Renner!',       name: 'Bernhard Zirnsak', title: 'CEO' },
  { quote: 'Nebel gelichtet, Weitblick ermöglicht, Vision entwickelt: Umsatz ist in 1 Jahr um mehr als 20% angestiegen.', name: 'Franz Reichle', title: 'CEO' },
  { quote: 'Enormes Wachstumspotential: Zieldefinition und Umsetzung mit dem MASTERPLAN von Stephan Christ.',             name: 'Thomas Guggenmos', title: 'Head of Sales' },
  { quote: 'Stephan hat mir geholfen, mein WARUM zu finden und meine Energie auf das auszurichten, was ich wirklich will!', name: 'Dr. Jan Gumprecht', title: 'Entrepreneur' },
  { quote: 'Mit Malte habe ich meine Vision und mein WARUM herausgearbeitet. Das gibt mir glasklare Orientierung.',        name: 'Jan Reimers', title: 'Unternehmer' },
  { quote: 'Stets neue, außergewöhnliche, einzigartige Ansätze und Ideen: Malte ist High-Professional.',                   name: 'Gil Rosen', title: 'VP Telekom Labs' },
]

function Testimonials() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pc-testimonial-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-28 px-6 md:px-16 lg:px-24"
      style={{ background: T.offwhite }}
    >
      <div className="max-w-2xl mb-16">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: T.red, fontFamily: MONO }}
        >
          Referenzen
        </p>
        <h2
          className="font-black text-4xl md:text-5xl leading-tight"
          style={{ color: T.black, fontFamily: SANS }}
        >
          Was unsere{' '}
          <span className="italic font-normal" style={{ color: T.red, fontFamily: SERIF }}>
            Kunden sagen.
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="pc-testimonial-card rounded-4xl p-8 border flex flex-col gap-6 transition-all duration-300"
            style={{
              background: i % 2 === 0 ? T.paper : T.offwhite,
              borderColor: `${T.black}15`,
            }}
          >
            <Star size={20} style={{ color: T.red }} />
            <p
              className="text-sm leading-relaxed italic flex-1"
              style={{ color: `${T.ink}CC`, fontFamily: SANS }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <div>
              <p className="font-semibold text-sm" style={{ color: T.black, fontFamily: SANS }}>
                {t.name}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: `${T.red}99`, fontFamily: MONO }}
              >
                {t.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   TEAM
───────────────────────────────────────────────────────────────────────────── */
function Team() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pc-team-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const members = [
    {
      name: 'Stephan Christ',
      roles: ['Unternehmer', 'Rennfahrer', 'Mentor', 'Akademiegründer'],
      bio: '25 Jahre internationale Erfahrung in Vertrieb, Führung und Unternehmenswachstum. Mit Highspeed ins Top-Management.',
      img: '/stephan.jpg',
    },
    {
      name: 'Malte Clavin',
      roles: ['Abenteuer-Journalist', 'Speaker', 'Consultant', 'Akademiegründer'],
      bio: '30 Jahre Erfahrung als Abenteurer und Unternehmensberater in 30 Ländern. Bekannt aus GEO und National Geographic.',
      img: '/malte.jpg',
    },
  ]

  const TeamCard = ({ member }) => (
    <div
      className="pc-team-card rounded-4xl overflow-hidden border group w-full"
      style={{ borderColor: `${T.black}20` }}
    >
      <div className="relative overflow-hidden flex justify-center" style={{ background: T.paper }}>
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-auto block mx-auto transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${T.paper} 0%, transparent 100%)` }}
        />
      </div>
      <div className="p-6 md:p-8" style={{ background: T.paper }}>
        <h3
          className="font-black text-xl md:text-2xl mb-3"
          style={{ color: T.black, fontFamily: SANS }}
        >
          {member.name}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
          {member.roles.map(r => (
            <span
              key={r}
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: `${T.red}15`,
                color: T.red,
                border: `1px solid ${T.red}30`,
                fontFamily: MONO,
              }}
            >
              {r}
            </span>
          ))}
        </div>
        <p
          className="text-sm leading-relaxed text-center md:text-left"
          style={{ color: `${T.ink}99`, fontFamily: SANS }}
        >
          {member.bio}
        </p>
      </div>
    </div>
  )

  return (
    <section ref={ref} className="py-28" style={{ background: T.black }}>
      <div className="max-w-2xl mb-16 mx-auto text-center px-6 md:px-16 lg:px-24">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: T.red, fontFamily: MONO }}
        >
          Die Gipfelstürmer
        </p>
        <h2
          className="font-black text-4xl md:text-5xl leading-tight"
          style={{ color: '#FAF8F5', fontFamily: SANS }}
        >
          Ihre Mentoren{' '}
          <span className="italic font-normal" style={{ color: T.red, fontFamily: SERIF }}>
            auf dem Weg nach oben.
          </span>
        </h2>
      </div>

      {/* Desktop layout */}
      <div
        className="hidden md:grid w-full items-start"
        style={{ gridTemplateColumns: '10% 35% 10% 35% 10%' }}
      >
        <div aria-hidden="true" />
        <TeamCard member={members[0]} />
        <div aria-hidden="true" />
        <TeamCard member={members[1]} />
        <div aria-hidden="true" />
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-8 md:hidden px-[10%]">
        {members.map((m, i) => <TeamCard key={i} member={m} />)}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROGRAMS
───────────────────────────────────────────────────────────────────────────── */
const programs = [
  {
    name: 'EXXPAND Masterplan',
    tagline: 'Starten Sie mit Vollgas.',
    duration: '6 Monate',
    highlight: 'In 6 Monaten mehr als Ihre Wettbewerber in 5 Jahren.',
    features: [
      'Persönliches Strategie-Coaching',
      'Zieldefinition & KPI-System',
      'Engpass-Analyse & Lösung',
      'Monatliche 1:1 Sessions',
      'EXXPAND Masterplan Framework',
    ],
    featured: false,
  },
  {
    name: 'EXXPAND Sales',
    tagline: 'Heben Sie ab.',
    duration: '12 Monate',
    highlight: 'Umsatz um 25–40 % steigern. Innovation zur profitablen Marke.',
    features: [
      'High Performance Vertriebsteam',
      'Positionierung & Markenaufbau',
      'High Probability Selling',
      'Sales-Prozess Optimierung',
      'Wöchentliche Team-Sessions',
      'Rohertrag +10–15 %',
    ],
    featured: true,
  },
  {
    name: 'EXXPAND Strategy',
    tagline: 'Bleiben Sie oben.',
    duration: '24 Monate',
    highlight: 'Zum Nischen-Marktführer. Fit für die Zukunft.',
    features: [
      'Marktführerschafts-Strategie',
      'Unternehmenskultur aufbauen',
      'Mitarbeiterbindung & Führung',
      'Zukunftssichere Positionierung',
      'Executive Mentoring',
      'Krisenresistenz & Skalierung',
    ],
    featured: false,
  },
]

function Programs() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pc-program-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="py-28 px-6 md:px-16 lg:px-24"
      style={{ background: T.offwhite }}
    >
      <div className="max-w-2xl mb-16">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: T.red, fontFamily: MONO }}
        >
          Programme
        </p>
        <h2
          className="font-black text-4xl md:text-5xl leading-tight"
          style={{ color: T.black, fontFamily: SANS }}
        >
          Ihr maßgeschneiderter{' '}
          <span className="italic font-normal" style={{ color: T.red, fontFamily: SERIF }}>
            EXXPAND-Plan.
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {programs.map((p) => (
          <div
            key={p.name}
            className={`pc-program-card rounded-4xl p-8 border flex flex-col gap-6 transition-all duration-300 ${p.featured ? 'scale-[1.03] shadow-2xl' : ''}`}
            style={{
              background: p.featured ? T.red : T.paper,
              borderColor: p.featured ? T.red : `${T.black}18`,
            }}
          >
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-3"
                style={{
                  color: p.featured ? '#FAF8F599' : `${T.red}99`,
                  fontFamily: MONO,
                }}
              >
                {p.duration}
              </p>
              <h3
                className="font-black text-xl leading-tight mb-2"
                style={{ color: p.featured ? '#FAF8F5' : T.black, fontFamily: SANS }}
              >
                {p.name}
              </h3>
              <p
                className="italic text-base font-normal"
                style={{
                  color: p.featured ? '#FAF8F5CC' : T.red,
                  fontFamily: SERIF,
                }}
              >
                {p.tagline}
              </p>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: p.featured ? '#FAF8F5CC' : `${T.ink}99`,
                fontFamily: SANS,
              }}
            >
              {p.highlight}
            </p>
            <ul className="flex flex-col gap-2.5 flex-1">
              {p.features.map(f => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckCircle
                    size={15}
                    className="mt-0.5 shrink-0"
                    style={{ color: p.featured ? '#FAF8F5' : T.red }}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: p.featured ? '#FAF8F5CC' : `${T.ink}CC`,
                      fontFamily: SANS,
                    }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <CtaLink
              className="mt-2 w-full py-3.5 rounded-2xl font-semibold text-sm justify-center"
              style={{
                background: p.featured ? T.black : T.red,
                color: '#FAF8F5',
                fontFamily: SANS,
              }}
              btnBgClassName="rounded-2xl"
              bgHover={p.featured ? T.ink : T.redHover}
              iconSize={14}
            >
              Jetzt starten
            </CtaLink>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────────────────── */
function Footer() {
  const navGroups = [
    {
      heading: 'Programme',
      links: ['EXXPAND Masterplan', 'EXXPAND Sales', 'EXXPAND Strategy'],
    },
    {
      heading: 'Unternehmen',
      links: ['Über uns', 'Referenzen', 'Blog', 'Newsroom'],
    },
    {
      heading: 'Ressourcen',
      links: ['Gratis-Ebook', 'Presseartikel', 'Newsletter', 'FAQ'],
    },
  ]

  return (
    <footer
      className="rounded-t-[4rem] pt-16 pb-10 px-6 md:px-16 lg:px-24"
      style={{ background: T.black, borderTop: `1px solid ${T.ink}` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <p
            className="font-black text-2xl tracking-tighter mb-4"
            style={{ color: '#FAF8F5', fontFamily: SANS }}
          >
            EXX<span style={{ color: T.red }}>PAND</span>
          </p>
          <p
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: '#FAF8F550', fontFamily: SANS }}
          >
            Top Performance Akademie für Unternehmer und Führungskräfte. Mit einem EXX-fachen schneller nach oben.
          </p>
          <div className="flex items-center gap-2 mt-6">
            <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#4ade80' }} />
            <span className="text-xs" style={{ color: '#4ade80', fontFamily: MONO }}>SYSTEM OPERATIONAL</span>
          </div>
        </div>
        {navGroups.map(g => (
          <div key={g.heading}>
            <p
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: T.red, fontFamily: MONO }}
            >
              {g.heading}
            </p>
            <ul className="flex flex-col gap-3">
              {g.links.map(l => (
                <li key={l}>
                  <a
                    href="#"
                    className="link-lift text-sm transition-colors"
                    style={{ color: '#FAF8F550', fontFamily: SANS }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4"
        style={{ borderTop: `1px solid ${T.ink}60` }}
      >
        <p
          className="text-xs"
          style={{ color: '#FAF8F530', fontFamily: MONO }}
        >
          © {new Date().getFullYear()} EXXPAND.DE — Alle Rechte vorbehalten.
        </p>
        <div className="flex items-center gap-6">
          {['Impressum', 'Datenschutz', 'Newsletter'].map(l => (
            <a
              key={l}
              href="#"
              className="link-lift text-xs transition-colors"
              style={{ color: '#FAF8F530', fontFamily: MONO }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP — Preset C root
───────────────────────────────────────────────────────────────────────────── */
export default function PresetC() {
  return (
    <div style={{ background: T.offwhite, color: T.black, fontFamily: SANS }}>
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Testimonials />
      <Team />
      <Programs />
      <Footer />
    </div>
  )
}
