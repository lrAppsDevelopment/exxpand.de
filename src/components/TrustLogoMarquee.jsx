import { CLIENT_LOGOS, trustLogoClass, trustLogoMaxWidth } from '../data/clientLogos'

function LogoStrip({ ariaHidden = false }) {
  return (
    <>
      {CLIENT_LOGOS.map((logo, i) => (
        <img
          key={`${logo.src}-${i}`}
          src={logo.src}
          alt={ariaHidden ? '' : logo.name}
          title={logo.name}
          aria-hidden={ariaHidden}
          draggable={false}
          className={`${trustLogoClass(logo)} ${trustLogoMaxWidth(logo.size, logo.tall)}`}
        />
      ))}
    </>
  )
}

export default function TrustLogoMarquee({ className = '' }) {
  return (
    <div
      className={`logo-marquee w-full overflow-hidden ${className}`}
      aria-label="Client logos"
    >
      <div className="logo-marquee-track">
        <div className="logo-marquee-group">
          <LogoStrip />
        </div>
        <div className="logo-marquee-group" aria-hidden="true">
          <LogoStrip ariaHidden />
        </div>
      </div>
    </div>
  )
}
