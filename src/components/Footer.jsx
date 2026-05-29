import { Link } from 'react-router-dom'
import { T } from '../theme'

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

const legalLinks = [
  { label: 'Impressum', to: '/impressum' },
  { label: 'Datenschutz', to: '/datenschutz' },
]

export default function Footer() {
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
          {legalLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="link-lift font-mono text-xs text-ivory/30 hover:text-ivory/60 transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href="https://exxpand.de/newsletter.php"
            target="_blank"
            rel="noopener noreferrer"
            className="link-lift font-mono text-xs text-ivory/30 hover:text-ivory/60 transition-colors"
          >
            Newsletter
          </a>
        </div>
      </div>
    </footer>
  )
}
