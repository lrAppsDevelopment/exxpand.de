/** Client logos for the hero marquee (one file per brand). */
export const CLIENT_LOGOS = [
  { name: '20th Century Fox', src: '/logos/20th-Century-Fox-Logo.png', size: 'wide' },
  { name: 'acal bfi', src: '/logos/acal-bfi.svg', bright: true },
  { name: 'Accenture', src: '/logos/accenture.png', size: 'wide' },
  { name: 'Baader Maschinenbau', src: '/logos/bader.png', size: 'large' },
  { name: 'BMK Group', src: '/logos/bmk.png' },
  { name: 'Christ Electronic Systems', src: '/logos/christ.svg', size: 'large' },
  { name: 'Deutsche Bahn', src: '/logos/deutsche_bahn.png', size: 'large', tall: true },
  { name: 'Gruner + Jahr', src: '/logos/gruner-jahr.svg', bright: true },
  { name: 'Le Figaro', src: '/logos/le-figaro.svg', size: 'wide', bright: true },
  { name: 'mm1 consulting', src: '/logos/mm1.png', size: 'large' },
  { name: 'Neue Zürcher Zeitung', src: '/logos/neue_zeitung.png', size: 'wide', bright: true },
  { name: 'O2', src: '/logos/o2.svg', size: 'large', tall: true },
  { name: 'PLANSEE', src: '/logos/plansee.png', size: 'large' },
  { name: 'Prozessreich', src: '/logos/prozessreich.png', size: 'large' },
  { name: 'Schiedel', src: '/logos/schiedel.png', size: 'wide' },
  { name: 'Spang Engineered Solutions', src: '/logos/spang.svg', size: 'large' },
  { name: 'TDK', src: '/logos/tdk.svg' },
  { name: 'Deutsche Telekom', src: '/logos/telekom.png', size: 'wide' },
  { name: 'Telekom Innovation Laboratories', src: '/logos/telekom_innovation.png', size: 'wide' },
  { name: 'UNFCCC', src: '/logos/united_nations.png', size: 'wide' },
  { name: 'Webasto', src: '/logos/webasto.svg', bright: true, size: 'large' },
  { name: 'Würth', src: '/logos/wuerth.svg', size: 'large' },
  { name: 'Zollner Elektronik', src: '/logos/zollner.svg', bright: true },
]

export function trustLogoMaxWidth(size, tall) {
  if (tall) return 'max-w-[150px] lg:max-w-[175px]'
  if (size === 'wide') return 'max-w-[160px] lg:max-w-[190px]'
  if (size === 'large') return 'max-w-[140px] lg:max-w-[165px]'
  return 'max-w-[110px] lg:max-w-[130px]'
}

export function trustLogoClass(logo) {
  const classes = ['trust-logo', 'w-auto', 'object-contain', 'object-center', 'shrink-0']
  if (logo.tall) {
    classes.push('trust-logo-tall')
  } else {
    classes.push('h-10', 'lg:h-12')
  }
  if (logo.bright) classes.push('trust-logo-bright')
  return classes.join(' ')
}
