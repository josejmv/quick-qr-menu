// utils
import { variants } from './utils'

// types
import type { HTMLAttributes } from 'react'

type BadgeVariantsType = keyof typeof variants

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  disabled?: boolean
  onClick?: () => void
  onRemove?: () => void
  variant?: BadgeVariantsType
}
