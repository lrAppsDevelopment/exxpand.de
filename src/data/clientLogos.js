/** Curated client logos for the hero trust bar (static single row). */
export const HERO_TRUST_LOGOS = [
  { name: 'Würth', src: '/logos/wuerth.svg', size: 'large' },
  { name: 'PLANSEE', src: '/logos/plansee.png', size: 'large' },
  { name: 'Deutsche Telekom', src: '/logos/telekom.png', size: 'wide' },
  { name: 'O2', src: '/logos/o2.png', size: 'large', tall: true, bright: true },
  { name: 'Deutsche Bahn', src: '/logos/deutsche_bahn.png', size: 'large', tall: true },
  { name: 'Zollner Elektronik', src: '/logos/zollner.svg', bright: true },
  { name: '20th Century Fox', src: '/logos/20th-Century-Fox-Logo.png', size: 'wide' },
]

export function trustLogoHeroMaxWidth(size, tall) {
  if (tall) return 'max-w-[108px] lg:max-w-[128px]'
  if (size === 'wide') return 'max-w-[118px] lg:max-w-[142px]'
  if (size === 'large') return 'max-w-[104px] lg:max-w-[124px]'
  return 'max-w-[88px] lg:max-w-[104px]'
}

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

export function trustLogoHeroClass(logo) {
  const classes = ['trust-logo', 'w-auto', 'object-contain', 'object-center', 'shrink-0']
  if (logo.tall) {
    classes.push('trust-logo-tall-hero')
  } else {
    classes.push('h-8', 'lg:h-10')
  }
  if (logo.bright) classes.push('trust-logo-bright')
  return classes.join(' ')
}
