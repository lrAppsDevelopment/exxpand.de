import { ArrowRight } from 'lucide-react'
import { CTA_URL, CTA_LABEL } from '../theme'

export default function CtaLink({
  className = '',
  style = {},
  variant = 'primary',
  iconSize = 14,
  children = CTA_LABEL,
  onClick,
}) {
  const isSecondary = variant === 'secondary'
  return (
    <a
      href={CTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`btn-magnetic inline-flex items-center gap-2 ${
        isSecondary ? 'btn-secondary' : 'btn-primary'
      } ${className}`}
      style={isSecondary ? undefined : style}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight size={iconSize} className="relative z-10 shrink-0" />
    </a>
  )
}
