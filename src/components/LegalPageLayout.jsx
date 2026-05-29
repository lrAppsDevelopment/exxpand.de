import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { T } from '../theme'

export default function LegalPageLayout({ title, children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ background: T.obsidian, minHeight: '100dvh' }}>
      <Navbar />
      <main className="pt-28 pb-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: T.champagne }}>
            Legal
          </p>
          <h1 className="font-sans font-black text-4xl md:text-5xl leading-tight text-ivory mb-10">
            {title}
          </h1>
          <div className="legal-content text-ivory/80 text-sm md:text-base leading-relaxed space-y-6">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
