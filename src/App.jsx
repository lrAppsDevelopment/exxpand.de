import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight, Star,
  CheckCircle
} from 'lucide-react'
import CtaLink from './components/CtaLink'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
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
      className="relative min-h-[100dvh] flex flex-col"
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

      {/* Reserve space for fixed navbar */}
      <div className="h-28 md:h-36 lg:h-40 shrink-0" aria-hidden="true" />

      {/* Content — bottom-aligned in remaining viewport */}
      <div className="relative z-10 flex flex-1 flex-col justify-end w-full px-6 md:px-16 lg:px-24 pb-10 md:pb-5">
        <div className="max-w-4xl">
          <div ref={headlineRef}>
            <p className="font-mono text-sm tracking-[0.25em] uppercase mb-4" style={{ color: T.champagne }}>
              Top Performance Akademie
            </p>
            <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight text-ivory mb-2">
              Wachstum trifft
            </h1>
            <h1
              className="font-serif italic font-black leading-none mb-8 md:mb-10"
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
            className="text-lg md:text-xl text-ivory/70 max-w-xl leading-relaxed mt-4 md:mt-6 mb-12 md:mb-14"
          >
            Mit EXXPAND erreichen Sie in 6 Monaten mehr als Ihre Wettbewerber in 5 Jahren.
            <br />
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

      <TrustLogoMarquee className="hidden md:block relative z-10 mt-8 lg:mt-10 mb-16 lg:mb-20 py-6 lg:py-8" />
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE CARD 1 — Effizienz (conversion rate animation)
───────────────────────────────────────────────────────────────────────────── */
function EffizienzCard() {
  const chartRef = useRef(null)
  const [closeRate, setCloseRate] = useState(30)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ticker = { value: 30 }
      gsap.to(ticker, {
        value: 60,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.8,
        onUpdate: () => setCloseRate(Math.round(ticker.value)),
      })
    }, chartRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      className="rounded-4xl p-8 flex flex-col gap-5 border h-full"
      style={{ background: T.ivory, borderColor: `${T.slate}30` }}
    >
      <h3 className="font-sans font-bold text-base leading-snug" style={{ color: T.obsidian }}>
        Mehr Abschlussquote statt teurerer Leads.
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: `${T.slate}99` }}>
        Die meisten Unternehmen verbrennen Budget für immer neue Kontakte. Wir machen es anders:
        Wir optimieren den bestehenden Vertriebsprozess so, dass sich die Abschlussquote Ihrer
        vorhandenen Leads um 30&nbsp;% bis 100&nbsp;% erhöht. Mehr Umsatz aus dem gleichen Marktpotenzial.
      </p>
      <div
        ref={chartRef}
        className="rounded-2xl p-5 border mt-auto"
        style={{ background: T.obsidian, borderColor: `${T.slate}` }}
      >
        <div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: `${T.slate}` }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${closeRate}%`, background: T.champagne }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-mono text-xs" style={{ color: `${T.ivory}50` }}>Abschlussrate</span>
            <span className="font-mono text-xs font-semibold" style={{ color: T.champagne }}>
              {closeRate}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE CARD 2 — Hardware- & Elektronik-DNA
───────────────────────────────────────────────────────────────────────────── */
const DNA_TAGS = ['B2B', 'Elektronik', 'Hardware', 'Mittelstand']

function HardwareDnaCard() {
  const [displayed, setDisplayed] = useState('')
  const [tagIdx, setTagIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const tag = DNA_TAGS[tagIdx]
    if (charIdx < tag.length) {
      const t = setTimeout(() => {
        setDisplayed(tag.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      }, 55)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setTagIdx(i => (i + 1) % DNA_TAGS.length)
        setCharIdx(0)
        setDisplayed('')
      }, 1600)
      return () => clearTimeout(t)
    }
  }, [charIdx, tagIdx])

  return (
    <div
      className="relative overflow-hidden rounded-4xl p-8 flex flex-col gap-5 border h-full"
      style={{ background: T.obsidian, borderColor: `${T.slate}` }}
    >
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.12]"
        aria-hidden="true"
        viewBox="0 0 400 320"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke={T.champagne} strokeWidth="1" fill="none">
          <rect x="40" y="40" width="120" height="80" rx="4" />
          <rect x="200" y="60" width="160" height="100" rx="4" />
          <path d="M160 80 L200 110" />
          <path d="M120 120 L200 160" />
          <circle cx="80" cy="200" r="28" />
          <circle cx="280" cy="220" r="36" />
          <path d="M108 200 L180 240 L260 220" />
          <path d="M60 260 H340" strokeDasharray="6 4" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={70 + i * 55} y1="260" x2={90 + i * 55} y2="290" />
          ))}
        </g>
      </svg>

      <h3 className="relative font-sans font-bold text-base leading-snug" style={{ color: T.ivory }}>
        Branchen-Expertise auf Augenhöhe.
      </h3>
      <p className="relative text-sm leading-relaxed" style={{ color: `${T.ivory}65` }}>
        Kein theoretisches Verkaufs-Blabla von generischen Coaches. Wir bringen über 30 Jahre
        echte Praxiserfahrung aus der Elektronik- und Hardware-Industrie mit. Und wir verstehen hochkomplexe,
        erklärungsbedürftige B2B-Produkte und sprechen exakt die Sprache Ihres Mittelstands.
      </p>
      <div
        className="relative mt-auto rounded-2xl px-4 py-3 border font-mono text-xs"
        style={{ background: `${T.slate}50`, borderColor: `${T.champagne}35`, color: T.champagne }}
      >
        {displayed}
        <span className="cursor-blink ml-0.5" style={{ color: T.champagne }}>█</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE CARD 3 — 5-Stufen-Umsetzungsgarantie
───────────────────────────────────────────────────────────────────────────── */
const FIVE_STAGES = [
  { step: 1, label: 'Analyse' },
  { step: 2, label: 'Strategie' },
  { step: 3, label: 'Integration' },
  { step: 4, label: 'Zielkontrolle' },
  { step: 5, label: 'Return on Invest' },
]

function FiveStagesCard() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % FIVE_STAGES.length)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const { step, label } = FIVE_STAGES[currentIndex]

  return (
    <div
      className="rounded-4xl p-8 flex flex-col gap-5 border h-full"
      style={{ background: T.ivory, borderColor: `${T.slate}30` }}
    >
      <h3 className="font-sans font-bold text-base leading-snug" style={{ color: T.obsidian }}>
        Ein praxiserprobtes System, das sofort greift.
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: `${T.slate}99` }}>
        Keine wochenlangen Seminare ohne messbares Ergebnis. Mit unserem strukturierten 5-Stufen-System
        (inspiriert von den Erfolgsstrategien des Weltmarktführers Würth) integrieren wir optimierte
        Prozesse direkt in Ihren Vertriebsalltag – inklusive ROI-Rechner und sofortiger Zielkontrolle.
      </p>
      <div className="relative min-h-[3.5rem] mt-auto overflow-visible">
        <div
          key={currentIndex}
          className="card-enter absolute inset-x-0 bottom-0 rounded-xl px-3.5 py-3 border flex items-center justify-between gap-2 min-w-0"
          style={{
            background: T.slate,
            borderColor: T.champagne,
            boxShadow: `0 4px 18px ${T.champagne}25`,
          }}
        >
          <p
            className="font-mono text-[11px] font-semibold truncate min-w-0"
            style={{ color: T.champagne }}
          >
            Schritt {step} · {label}
          </p>
          <CheckCircle size={15} className="shrink-0" style={{ color: T.champagne }} />
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
    <section id="features" ref={ref} className="pt-20 md:pt-28 pb-28 px-6 md:px-16 lg:px-24">
      <div className="feature-header max-w-2xl mb-16">
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: T.champagne }}>
          Was wir bieten
        </p>
        <h2 className="font-sans font-black text-4xl md:text-5xl leading-tight text-ivory">
          Unser Ansatz.<br />
          <span className="font-serif italic" style={{ color: T.champagne }}>Ihr Vorsprung.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="feature-card"><EffizienzCard /></div>
        <div className="feature-card"><HardwareDnaCard /></div>
        <div className="feature-card"><FiveStagesCard /></div>
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
          {['Wir', 'fokussieren', 'uns', 'auf', 'exakt', 'eine', 'Sache:'].map((w, i) => (
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
            Ergebnisse
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
                <Star key={starIndex} size={20} fill={T.champagne} stroke={T.champagne} style={{ color: T.champagne }} />
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
    <section id="ueber-uns" ref={ref} className="py-28" style={{ background: `${T.slate}60` }}>
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
