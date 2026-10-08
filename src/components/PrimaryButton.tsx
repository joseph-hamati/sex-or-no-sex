import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'coral' | 'paper' | 'outline'
  arrow?: boolean
}

export function PrimaryButton({ children, variant = 'coral', arrow = false, className = '', ...props }: Props) {
  return (
    <button className={`primary-button primary-button--${variant} ${className}`} {...props}>
      <span>{children}</span>
      {arrow && <span className="button-arrow" aria-hidden="true">↗</span>}
    </button>
  )
}
