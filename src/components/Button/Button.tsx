import type { ComponentProps, ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ComponentProps<'button'> {
  /** Visual hierarchy. Figma: Type. */
  variant?: ButtonVariant
  /** Figma: Size. */
  size?: ButtonSize
  /** Button text. Figma: Label. */
  children: ReactNode
  /** Icon before the label, shown at 16×16 in the text color. Figma: Icon left + Left icon. */
  iconLeft?: ReactNode
  /** Icon after the label, shown at 16×16 in the text color. Figma: Icon right + Right icon. */
  iconRight?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'sm',
  type = 'button',
  iconLeft,
  iconRight,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ')

  return (
    <button {...rest} type={type} className={classes}>
      {iconLeft && (
        <span className={styles.icon} aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight && (
        <span className={styles.icon} aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  )
}
