import { HERO_TRUST_LOGOS, trustLogoHeroClass, trustLogoHeroMaxWidth } from '../data/clientLogos'

export default function TrustLogoMarquee({ className = '' }) {
  return (
    <div
      className={`w-full px-6 md:px-16 lg:px-24 ${className}`}
      aria-label="Client logos"
    >
      <div className="mx-auto flex max-w-4xl min-w-0 items-center justify-center gap-7 lg:max-w-5xl lg:gap-9">
        {HERO_TRUST_LOGOS.map((logo) => (
          <img
            key={logo.src}
            src={logo.src}
            alt={logo.name}
            title={logo.name}
            draggable={false}
            className={`${trustLogoHeroClass(logo)} ${trustLogoHeroMaxWidth(logo.size, logo.tall)}`}
          />
        ))}
      </div>
    </div>
  )
}
