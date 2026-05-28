import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight, Zap, TrendingUp, Users, Star,
  Calendar, CheckCircle
} from 'lucide-react'
import CtaLink from './components/CtaLink'
import Navbar from './components/Navbar'
import TrustLogoMarquee from './components/TrustLogoMarquee'
import { T, CTA_URL, CTA_LABEL } from './theme'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────────── */
function Hero() {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

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
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/bergsteiger2.jpg')`,
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${T.obsidian} 0%, ${T.obsidian}CC 40%, ${T.obsidian}66 70%, transparent 100%)`,
        }}
      />
      {/* Side gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${T.obsidian}BB 0%, transparent 60%)`,
        }}
      />

      {/* Content + trust logos — same horizontal padding as all sections */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          <div ref={headlineRef}>
            <p className="font-mono text-sm tracking-[0.25em] uppercase mb-4" style={{ color: T.champagne }}>
              Top Performance Akademie
            </p>
            <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight text-ivory mb-2">
              Wachstum trifft
            </h1>
            <h1
              className="font-serif italic font-black leading-none mb-6"
              style={{
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                color: T.champagne,
                lineHeight: 0.9,
              }}
            >
              Präzision.
            </h1>
          </div>

          <p
            ref={subRef}
            className="text-lg md:text-xl text-ivory/70 max-w-xl leading-relaxed mb-10"
          >
            Mit EXXPAND erreichen Sie in 6 Monaten mehr als Ihre Wettbewerber in 5 Jahren.
            <br />
            Persönlich. Messbar. Unaufhaltsam.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
            <CtaLink
              className="gap-3 text-base font-semibold px-8 py-4 rounded-full"
              style={{ backgroundColor: T.champagne, color: T.obsidian }}
              iconSize={18}
            />
          </div>
        </div>
      </div>

      <TrustLogoMarquee className="hidden md:block relative z-10 mt-16 lg:mt-20 mb-16 lg:mb-20 py-6 lg:py-8" />
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE CARD 1 — Diagnostic Shuffler (Masterplan & Umsetzung)
───────────────────────────────────────────────────────────────────────────── */
function ShufflerCard() {
  const items = [
    { label: 'Vision & Mission klar', sub: 'Glasklares Leitbild definiert' },
    { label: 'Engpässe aufgelöst', sub: 'Hindernisse systematisch eliminiert' },
    { label: 'Gipfel erreicht', sub: '6 Monate statt 5 Jahre' },
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
    <div className="rounded-4xl p-8 flex flex-col gap-6 border h-full"
      style={{ background: T.ivory, borderColor: `${T.slate}30` }}>
      <div className="flex items-center justify-between">
        <span className="font-sans font-bold text-lg" style={{ color: T.obsidian }}>Masterplan & Umsetzung</span>
        <Zap size={18} style={{ color: T.champagne }} />
      </div>
      <p className="text-sm" style={{ color: `${T.slate}99` }}>
        Konkrete Anleitung zur aktiven Ziel-Umsetzung — für Sie, Ihr Unternehmen und Ihr Team.
      </p>
      <div className="relative h-44 flex flex-col justify-end gap-2">
        {stack.map((item, i) => (
          <div
            key={item.label}
            className="card-enter absolute w-full rounded-3xl p-4 border flex justify-between items-center"
            style={{
              bottom: `${i * 14}px`,
              zIndex: stack.length - i,
              background: i === 0 ? T.obsidian : T.ivory,
              borderColor: i === 0 ? T.champagne : `${T.slate}25`,
              transform: `scale(${1 - i * 0.04}) translateY(0)`,
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              opacity: 1 - i * 0.25,
            }}
          >
            <div>
              <p className="font-semibold text-sm"
                style={{ color: i === 0 ? T.ivory : T.obsidian }}>{item.label}</p>
              <p className="text-xs mt-0.5"
                style={{ color: i === 0 ? `${T.ivory}80` : `${T.slate}80` }}>{item.sub}</p>
            </div>
            {i === 0 && <CheckCircle size={18} style={{ color: T.champagne }} />}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE CARD 2 — Telemetry Typewriter (Umsatz & Wachstum)
───────────────────────────────────────────────────────────────────────────── */
function TypewriterCard() {
  const messages = [
    '> Umsatz +25–40 % in 12 Monaten',
    '> Rohertrag um 10–15 % gehoben',
    '> High Probability Selling aktiv',
    '> Positionierung als Marktführer',
    '> 100 % tägliche Zielkontrolle',
    '> Produktportfolio optimiert',
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
    <div className="rounded-4xl p-8 flex flex-col gap-6 border h-full"
      style={{ background: T.obsidian, borderColor: `${T.slate}` }}>
      <div className="flex items-center justify-between">
        <span className="font-sans font-bold text-lg" style={{ color: T.ivory }}>Umsatz & Wachstum</span>
        <TrendingUp size={18} style={{ color: T.champagne }} />
      </div>
      <p className="text-sm" style={{ color: `${T.ivory}60` }}>
        Umsatz +25–40 % · Rohertrag +10–15 % · High Performance Vertrieb — in 12 Monaten.
      </p>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#4ade80' }} />
        <span className="font-mono text-xs" style={{ color: '#4ade80' }}>LIVE FEED</span>
      </div>
      <div
        className="flex-1 rounded-2xl p-4 font-mono text-sm min-h-[120px]"
        style={{ background: `${T.slate}60`, color: T.champagne }}
      >
        <p className="leading-relaxed">
          {displayed}
          <span className="cursor-blink ml-0.5" style={{ color: T.champagne }}>█</span>
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE CARD 3 — Scheduler (Potenzial & Teamkultur)
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
    <div className="rounded-4xl p-8 flex flex-col gap-6 border h-full"
      style={{ background: T.ivory, borderColor: `${T.slate}30` }}>
      <div className="flex items-center justify-between">
        <span className="font-sans font-bold text-lg" style={{ color: T.obsidian }}>Potenzial & Teamkultur</span>
        <Users size={18} style={{ color: T.champagne }} />
      </div>
      <p className="text-sm" style={{ color: `${T.slate}99` }}>
        Einzigartige Unternehmenskultur aufbauen. Mitarbeiter binden. Volles Potenzial entfalten.
      </p>
      <div className="rounded-2xl p-5 border" style={{ background: T.obsidian, borderColor: `${T.slate}` }}>
        <div className="flex items-center gap-1.5 mb-4">
          <Calendar size={14} style={{ color: T.champagne }} />
          <span className="font-mono text-xs" style={{ color: `${T.ivory}60` }}>EXXPAND PERFORMANCE TRACKER</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d, i) => (
            <div
              key={d}
              className="flex flex-col items-center gap-1.5 transition-all duration-300"
              style={{ transform: i === cursorPos ? 'scale(1.15)' : 'scale(1)' }}
            >
              <span className="font-mono text-xs" style={{ color: `${T.ivory}50` }}>{d}</span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  background: i === activeDay ? T.champagne : `${T.slate}80`,
                  transform: i === cursorPos ? 'scale(0.95)' : 'scale(1)',
                }}
              >
                {i === activeDay && <CheckCircle size={14} style={{ color: T.obsidian }} />}
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-4 rounded-lg px-4 py-2 text-center font-mono text-xs transition-all duration-300"
          style={{ background: `${T.champagne}25`, color: T.champagne, border: `1px solid ${T.champagne}40` }}
        >
          Potenzial voll ausgeschöpft · Gipfel erreicht
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
      gsap.fromTo('.feature-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        }
      )
      gsap.fromTo('.feature-header',
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
    <section id="features" ref={ref} className="pt-0 pb-28 px-6 md:px-16 lg:px-24">
      <div className="feature-header max-w-2xl mb-16">
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: T.champagne }}>
          Was wir bieten
        </p>
        <h2 className="font-sans font-black text-4xl md:text-5xl leading-tight text-ivory">
          Drei Dimensionen.<br />
          <span className="font-serif italic" style={{ color: T.champagne }}>Ein Gipfel.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="feature-card"><ShufflerCard /></div>
        <div className="feature-card"><TypewriterCard /></div>
        <div className="feature-card"><SchedulerCard /></div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PHILOSOPHY
───────────────────────────────────────────────────────────────────────────── */
function Philosophy() {
  const ref = useRef(null)
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
      style={{ background: T.slate }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/stephan_anzug.jpg')`,
          backgroundPosition: 'center 20%',
          opacity: 0.38,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(105deg, ${T.slate}E8 0%, ${T.slate}A8 45%, ${T.slate}70 100%)`,
        }}
      />
      <div ref={textRef} className="relative z-10 max-w-5xl mx-auto">
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-12" style={{ color: T.champagne }}>
          Unsere Philosophie
        </p>
        <p className="text-base md:text-lg text-ivory/50 mb-8 leading-relaxed">
          {['Die', 'meisten', 'Berater', 'fokussieren', 'sich', 'auf:'].map((w, i) => (
            <span key={i} className="word-reveal inline-block mr-2">{w}</span>
          ))}
          <br />
          {['Strategiepapiere,', 'PowerPoint-Decks', 'und', 'endlose', 'Konzepte.'].map((w, i) => (
            <span key={i} className="word-reveal inline-block mr-2">{w}</span>
          ))}
        </p>
        <p className="text-2xl md:text-3xl font-semibold text-ivory/70 mb-6">
          {['Wir', 'fokussieren', 'uns', 'auf:'].map((w, i) => (
            <span key={i} className="word-reveal inline-block mr-3">{w}</span>
          ))}
        </p>
        <div className="overflow-hidden pb-3">
          <p
            className="word-reveal font-serif italic font-black leading-[1.12]"
            style={{
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              color: T.champagne,
            }}
          >
            100 % Umsetzung.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: '5.000+', label: 'Branchenkontakte weltweit' },
            { n: '743', label: 'Erfolgreiche Projekte' },
            { n: '25', label: 'Jahre Expertise' },
            { n: '12.000', label: 'Bewegte Menschen' },
          ].map((s, i) => (
            <div key={i} className="word-reveal">
              <p className="font-black text-3xl md:text-4xl" style={{ color: T.champagne }}>{s.n}</p>
              <p className="font-mono text-xs text-ivory/40 mt-2 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   E-BOOK
───────────────────────────────────────────────────────────────────────────── */
const ebookArticles = [
  'Großkundengewinnung mit Erfolgsgarantie',
  'Kaum jemand mag es, jeder tut es täglich: Verhandeln. Was jeder über Verhandeln wissen sollte.',
  'High Probability Selling: Die neue bahnbrechende Verkaufsmethode, die Sie garantiert überraschen wird.',
  'Spitzenumsätze im Handumdrehen',
]

function Ebook() {
  const ref = useRef(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ebook-reveal',
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
    <section id="ebook" ref={ref} className="py-28 px-6 md:px-16 lg:px-24" style={{ background: '#0A0A0F' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="ebook-reveal flex justify-center lg:justify-start">
          <img
            src="/ebook.png"
            alt="EXXPAND Gratis-E-Book"
            className="w-full max-w-sm md:max-w-md rounded-4xl shadow-2xl object-cover"
          />
        </div>
        <div className="ebook-reveal flex flex-col gap-8">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: T.champagne }}>
              Gratis-E-Book
            </p>
            <h2 className="font-sans font-black text-4xl md:text-5xl leading-tight text-ivory">
              Über 40 Seiten<br />
              <span className="font-serif italic" style={{ color: T.champagne }}>exklusive Inhalte.</span>
            </h2>
          </div>
          <ul className="flex flex-col gap-4">
            {ebookArticles.map((article) => (
              <li key={article} className="ebook-reveal flex items-start gap-3">
                <CheckCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                  style={{ color: T.champagne }}
                />
                <span className="text-sm md:text-base text-ivory/80 leading-relaxed">{article}</span>
              </li>
            ))}
            <li className="ebook-reveal flex items-start gap-3">
              <CheckCircle
                size={18}
                className="mt-0.5 shrink-0"
                style={{ color: T.champagne }}
              />
              <span className="text-sm md:text-base text-ivory/60 leading-relaxed italic">
                … und 6 weitere Artikel.
              </span>
            </li>
          </ul>
          <form
            className="ebook-reveal flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              name="email"
              placeholder="Ihre E-Mail-Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 px-5 py-3.5 rounded-2xl border text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:ring-2 focus:ring-champagne/40 transition-shadow"
              style={{
                background: `${T.obsidian}99`,
                borderColor: 'rgba(250, 248, 245, 0.35)',
              }}
            />
            <button
              type="submit"
              className="btn-magnetic btn-secondary shrink-0 px-8 py-3.5 rounded-2xl font-semibold text-sm whitespace-nowrap"
            >
              Anfordern
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────────────────────────────────────── */
const testimonials = [
  { quote: 'Stephans Masterplan und Team Sales Performance Programm — ein Renner!', name: 'Bernhard Zirnsak', title: 'CEO' },
  { quote: 'Nebel gelichtet, Weitblick ermöglicht, Vision entwickelt: Umsatz ist in 1 Jahr um mehr als 20% angestiegen.', name: 'Franz Reichle', title: 'CEO' },
  { quote: 'Enormes Wachstumspotential: Zieldefinition und Umsetzung mit dem MASTERPLAN von Stephan Christ.', name: 'Thomas Guggenmos', title: 'Head of Sales' },
  { quote: 'Stephan hat mir geholfen, mein WARUM zu finden und meine Energie auf das auszurichten, was ich wirklich will!', name: 'Dr. Jan Gumprecht', title: 'Entrepreneur' },
  { quote: 'Mit Malte habe ich meine Vision und mein WARUM herausgearbeitet. Das gibt mir glasklare Orientierung.', name: 'Jan Reimers', title: 'Unternehmer' },
  { quote: 'Stets neue, außergewöhnliche, einzigartige Ansätze und Ideen: Malte ist High-Professional.', name: 'Gil Rosen', title: 'VP Telekom Labs' },
]

function Testimonials() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-card',
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
    <section id="testimonials" ref={ref} className="py-28 px-6 md:px-16 lg:px-24">
      <div className="max-w-2xl mb-16">
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: T.champagne }}>
          Referenzen
        </p>
        <h2 className="font-sans font-black text-4xl md:text-5xl leading-tight text-ivory">
          Was unsere<br />
          <span className="font-serif italic" style={{ color: T.champagne }}>Kunden sagen.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="testimonial-card rounded-4xl p-8 border flex flex-col gap-6 transition-all duration-300 hover:border-champagne/30"
            style={{
              background: i % 2 === 0 ? T.slate : `${T.slate}60`,
              borderColor: `${T.slate}80`,
            }}
          >
            <div className="flex gap-1" aria-label="5 von 5 Sternen">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star key={starIndex} size={20} style={{ color: T.champagne }} />
              ))}
            </div>
            <p className="text-ivory/80 text-sm leading-relaxed italic flex-1">&ldquo;{t.quote}&rdquo;</p>
            <div>
              <p className="font-semibold text-sm text-ivory">{t.name}</p>
              <p className="font-mono text-xs mt-0.5" style={{ color: `${T.champagne}99` }}>{t.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link
          to="/erfolgsgeschichten"
          className="btn-magnetic btn-secondary inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm"
        >
          Alle Erfolgsgeschichten
          <ArrowRight size={16} />
        </Link>
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
      gsap.fromTo('.team-card',
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
      className="team-card rounded-4xl overflow-hidden border group w-full"
      style={{ borderColor: `${T.slate}80` }}
    >
      <div className="relative overflow-hidden flex justify-center" style={{ background: T.obsidian }}>
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-auto block mx-auto transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #000000 0%, transparent 100%)' }}
        />
      </div>
      <div className="p-6 md:p-8" style={{ background: '#000000' }}>
        <h3 className="font-sans font-black text-xl md:text-2xl text-ivory mb-3">{member.name}</h3>
        <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
          {member.roles.map(r => (
            <span
              key={r}
              className="font-mono text-xs px-3 py-1 rounded-full"
              style={{ background: `${T.champagne}20`, color: T.champagne, border: `1px solid ${T.champagne}30` }}
            >
              {r}
            </span>
          ))}
        </div>
        <p className="text-ivory/60 text-sm leading-relaxed text-center md:text-left">{member.bio}</p>
      </div>
    </div>
  )

  return (
    <section ref={ref} className="py-28" style={{ background: `${T.slate}60` }}>
      <div className="max-w-2xl mb-16 mx-auto text-center px-6 md:px-16 lg:px-24">
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: T.champagne }}>
          Die Gipfelstürmer
        </p>
        <h2 className="font-sans font-black text-4xl md:text-5xl leading-tight text-ivory">
          Ihre Mentoren<br />
          <span className="font-serif italic" style={{ color: T.champagne }}>auf dem Weg nach oben.</span>
        </h2>
      </div>

      {/* Desktop: 10% | 35% | 10% | 35% | 10% */}
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

      {/* Mobile: gestapelt mit seitlichem Rand */}
      <div className="flex flex-col gap-8 md:hidden px-[10%]">
        {members.map((m, i) => (
          <TeamCard key={i} member={m} />
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROGRAMS / PRICING
───────────────────────────────────────────────────────────────────────────── */
const programs = [
  {
    name: 'EXXPAND Masterplan',
    tagline: 'Starten Sie mit Vollgas.',
    duration: '6 Monate',
    highlight: 'In 6 Monaten mehr als Ihre Wettbewerber in 5 Jahren.',
    features: [
      'Allgemein-Nutzen: Maximale Potenzialentfaltung durch ganzheitliches Erfolgs-Coaching & strategische Positionierung',
      'Mindset: Mentale Exzellenz – Gewinner-Mentalität durch Auflösen von Ängsten & Engpässen',
      'Persönlichkeitsentwicklung: Visionskraft mit Umsetzungsgarantie – klares Leitbild mit verbindlichem Pfad',
      'Positionierung: Radikaler Fokus auf das Wesentliche – 5-Stufen-System mit täglicher Zielkontrolle',
    ],
    featured: false,
  },
  {
    name: 'EXXPAND Sales',
    tagline: 'Heben Sie ab.',
    duration: '12 Monate',
    highlight: 'Umsatz um 25–40 % steigern. Innovation zur profitablen Marke.',
    features: [
      'Allgemein-Nutzen: Maximale Potenzialentfaltung durch ganzheitliches Erfolgs-Coaching & strategische Positionierung',
      'Mindset: Mentale Exzellenz – Gewinner-Mentalität durch Auflösen von Ängsten & Engpässen',
      'Persönlichkeitsentwicklung: Visionskraft mit Umsetzungsgarantie – klares Leitbild mit verbindlichem Pfad',
      'Positionierung: Radikaler Fokus auf das Wesentliche – 5-Stufen-System mit täglicher Zielkontrolle',
      'Wachsen wie Würth: Skalierung & Markenaufbau in 12 Monaten durch Konzern-Prinzipien & Vertriebsstrukturen',
    ],
    featured: true,
  },
  {
    name: 'EXXPAND Strategy',
    tagline: 'Bleiben Sie oben.',
    duration: '24 Monate',
    highlight: 'Zum Nischen-Marktführer. Fit für die Zukunft.',
    features: [
      'Allgemein-Nutzen: Maximale Potenzialentfaltung durch ganzheitliches Erfolgs-Coaching & strategische Positionierung',
      'Mindset: Mentale Exzellenz – Gewinner-Mentalität durch Auflösen von Ängsten & Engpässen',
      'Persönlichkeitsentwicklung: Visionskraft mit Umsetzungsgarantie – klares Leitbild mit verbindlichem Pfad',
      'Positionierung: Radikaler Fokus auf das Wesentliche – 5-Stufen-System mit täglicher Zielkontrolle',
      'Wachsen wie Würth: Skalierung & Markenaufbau in 12 Monaten durch Konzern-Prinzipien & Vertriebsstrukturen',
      'Lizenzmodelle & Nachfolge: Nischenmarktführerschaft & passive Einkommensströme in 12 Monaten',
    ],
    featured: false,
  },
]

function Programs() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.program-card',
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
    <section ref={ref} className="py-28 px-6 md:px-16 lg:px-24">
      <div className="max-w-2xl mb-16">
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: T.champagne }}>
          Programme
        </p>
        <h2 className="font-sans font-black text-4xl md:text-5xl leading-tight text-ivory">
          Ihr maßgeschneiderter<br />
          <span className="font-serif italic" style={{ color: T.champagne }}>EXXPAND-Plan.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-stretch">
        {programs.map((p) => (
          <div
            key={p.name}
            className="program-card h-full rounded-4xl p-8 border flex flex-col gap-6 transition-all duration-300"
            style={{
              background: p.featured ? T.champagne : T.slate,
              borderColor: p.featured ? 'transparent' : `${T.slate}80`,
            }}
          >
            <div>
              <p
                className="font-mono text-xs tracking-widest uppercase mb-3"
                style={{ color: p.featured ? `${T.obsidian}99` : `${T.champagne}99` }}
              >
                {p.duration}
              </p>
              <h3
                className="font-sans font-black text-xl leading-tight mb-2"
                style={{ color: p.featured ? T.obsidian : T.ivory }}
              >
                {p.name}
              </h3>
              <p
                className="font-serif italic text-base"
                style={{ color: p.featured ? T.obsidian : T.champagne }}
              >
                {p.tagline}
              </p>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: p.featured ? `${T.obsidian}CC` : `${T.ivory}70` }}
            >
              {p.highlight}
            </p>
            <ul className="flex flex-col gap-2.5 flex-1">
              {p.features.map(f => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckCircle
                    size={15}
                    className="mt-0.5 shrink-0"
                    style={{ color: p.featured ? T.obsidian : T.champagne }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: p.featured ? `${T.obsidian}CC` : `${T.ivory}80` }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <CtaLink
              className="mt-auto w-full py-3.5 rounded-2xl font-semibold text-sm justify-center shrink-0"
              style={{
                background: p.featured ? T.obsidian : T.champagne,
                color: p.featured ? T.ivory : T.obsidian,
              }}
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
      style={{ background: T.obsidian, borderTop: `1px solid ${T.slate}` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <p className="font-black text-2xl tracking-tighter mb-4">
            EXX<span style={{ color: T.champagne }}>PAND</span>
          </p>
          <p className="text-ivory/50 text-sm leading-relaxed max-w-xs">
            Top Performance Akademie für Unternehmer und Führungskräfte. EXX-fach schneller nach oben.
          </p>
        </div>
        {navGroups.map(g => (
          <div key={g.heading}>
            <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: T.champagne }}>
              {g.heading}
            </p>
            <ul className="flex flex-col gap-3">
              {g.links.map(l => (
                <li key={l}>
                  <a href="#" className="link-lift text-sm text-ivory/50 hover:text-ivory transition-colors">
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
        style={{ borderTop: `1px solid ${T.slate}60` }}
      >
        <p className="font-mono text-xs text-ivory/30">
          © {new Date().getFullYear()} EXXPAND.DE — Alle Rechte vorbehalten.
        </p>
        <div className="flex items-center gap-6">
          {['Impressum', 'Datenschutz', 'Newsletter'].map(l => (
            <a key={l} href="#" className="link-lift font-mono text-xs text-ivory/30 hover:text-ivory/60 transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP
───────────────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div style={{ background: T.obsidian }}>
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Ebook />
      <Testimonials />
      <Team />
      <Programs />
      <Footer />
    </div>
  )
}
