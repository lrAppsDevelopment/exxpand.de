import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function scrollToHash(hash) {
  if (!hash) return
  requestAnimationFrame(() => {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  })
}
import { Menu, X } from 'lucide-react'
import CtaLink from './CtaLink'
import { T } from '../theme'

const NAV_LINKS = [
  { label: 'Philosophie', href: '#philosophy' },
  { label: 'Referenzen', href: '#testimonials' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Leistungen', href: '#features' },
]

const linkClass =
  'link-lift text-sm font-medium text-ivory/70 hover:text-ivory transition-colors'

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(!isHome)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    if (isHome && location.hash) {
      scrollToHash(location.hash)
    }
  }, [isHome, location.pathname, location.hash])

  const scrollTo = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinkProps = (href) => {
    if (isHome) {
      return { onClick: () => scrollTo(href) }
    }
    return { to: `/${href}`, onClick: () => setMenuOpen(false) }
  }

  const NavLink = ({ label, href, className }) =>
    isHome ? (
      <button type="button" {...navLinkProps(href)} className={className}>
        {label}
      </button>
    ) : (
      <Link {...navLinkProps(href)} className={className}>
        {label}
      </Link>
    )

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-6 md:px-8 py-3 flex items-center gap-6 md:gap-8 w-max max-w-[96vw] ${
          scrolled
            ? 'bg-[#0D0D12]/70 backdrop-blur-xl border border-[#2A2A35] shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        {isHome ? (
          <a href="#" className="font-black tracking-tighter text-ivory text-lg select-none shrink-0">
            EXX<span style={{ color: T.champagne }}>PAND</span>
          </a>
        ) : (
          <Link to="/" className="font-black tracking-tighter text-ivory text-lg select-none shrink-0">
            EXX<span style={{ color: T.champagne }}>PAND</span>
          </Link>
        )}

        <div className="hidden md:flex items-center gap-6 shrink-0">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.label} label={l.label} href={l.href} className={linkClass} />
          ))}
        </div>

        <CtaLink
          className="hidden md:flex text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap shrink-0"
          style={{ backgroundColor: T.champagne, color: T.obsidian }}
        />

        <button
          type="button"
          className="md:hidden text-ivory/80 hover:text-ivory"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8"
          style={{ background: `${T.obsidian}F2` }}
        >
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.label}
              label={l.label}
              href={l.href}
              className="text-2xl font-semibold text-ivory hover:text-champagne transition-colors"
            />
          ))}
          <CtaLink
            className="text-base font-semibold px-8 py-4 rounded-full mt-4"
            style={{ backgroundColor: T.champagne, color: T.obsidian }}
            iconSize={18}
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </>
  )
}
