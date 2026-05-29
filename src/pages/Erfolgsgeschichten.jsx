import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'
import { erfolgsgeschichtenStories } from '../data/erfolgsgeschichtenStories'
import { getErfolgsgeschichtePhoto } from '../data/erfolgsgeschichtenPhotos'
import { T, CTA_URL, CTA_LABEL } from '../theme'

function StoryCard({ story, index }) {
  const photo = story.photo ?? getErfolgsgeschichtePhoto(story.name)

  return (
    <article
      className="story-card relative w-full rounded-4xl p-8 md:p-10 lg:p-12 border flex flex-col gap-8"
      style={{
        background: index % 2 === 0 ? T.slate : `${T.slate}60`,
        borderColor: `${T.slate}80`,
      }}
    >
      <div className="flex gap-1" aria-label="5 von 5 Sternen">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={18} fill={T.champagne} stroke={T.champagne} style={{ color: T.champagne }} />
        ))}
      </div>

      {story.quote && (
        <p className="font-serif italic text-2xl md:text-3xl leading-snug text-ivory max-w-4xl">
          &ldquo;{story.quote}&rdquo;
        </p>
      )}

      <div className="flex flex-col gap-4 text-ivory/75 text-base md:text-lg leading-relaxed max-w-4xl">
        {story.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {(story.name || story.title || story.company) && (
        <div
          className={`pt-6 border-t max-w-4xl ${story.logo ? 'pr-[10.5rem] md:pr-[13.5rem]' : ''}`}
          style={{ borderColor: `${T.slate}80` }}
        >
          <div className="flex items-center gap-4">
            {photo && (
              <div className="story-portrait shrink-0 w-14 h-14 md:w-16 md:h-16">
                <img
                  src={photo}
                  alt={story.name ? `Portrait of ${story.name}` : ''}
                  width={64}
                  height={64}
                  draggable={false}
                />
              </div>
            )}
            <div className="min-w-0">
              {story.name && <p className="font-semibold text-lg text-ivory">{story.name}</p>}
              {(story.title || story.company) && (
                <p className="font-mono text-sm mt-1" style={{ color: `${T.champagne}99` }}>
                  {[story.title, story.company].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {story.logo && (
        <img
          src={story.logo}
          alt={story.logoAlt || ''}
          className={`case-study-logo absolute bottom-8 right-8 md:bottom-10 md:right-10 h-12 md:h-14 w-auto object-contain pointer-events-none ${
            story.logoSize === 'wide' ? 'max-w-[180px] md:max-w-[210px]' :
            story.logoSize === 'large' ? 'max-w-[150px] md:max-w-[180px]' :
            'max-w-[108px] md:max-w-[132px]'
          }`}
        />
      )}
    </article>
  )
}

export default function Erfolgsgeschichten() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.story-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ background: T.obsidian, minHeight: '100dvh' }}>
      <Navbar />

      <main className="pt-28 pb-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: T.champagne }}>
            Referenzen
          </p>
          <h1 className="font-sans font-black text-4xl md:text-5xl leading-tight text-ivory mb-4">
            Eine Auswahl unserer<br />
            <span className="font-serif italic" style={{ color: T.champagne }}>Erfolgsgeschichten.</span>
          </h1>
          <p className="text-ivory/60 text-base md:text-lg leading-relaxed">
            Messbare Ergebnisse aus über 25 Jahren Branchenerfahrung.
          </p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {erfolgsgeschichtenStories.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>

        <div
          className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center pt-16 mt-8 border-t"
          style={{ borderColor: `${T.slate}80` }}
        >
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm"
            style={{ backgroundColor: T.champagne, color: T.obsidian }}
          >
            {CTA_LABEL}
            <ArrowRight size={16} />
          </a>
          <Link
            to="/"
            className="btn-magnetic btn-secondary inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm"
          >
            <ArrowLeft size={16} />
            Zur Startseite
          </Link>
        </div>
      </main>
    </div>
  )
}
