// main tools
import { twMerge } from 'tailwind-merge'

// components
import { XMarkIcon } from '@heroicons/react/24/outline'

// utils
import { removeButtonVariants, variants } from './utils'

// types
import type { BadgeProps } from './types'
import type { FC } from 'react'

export const Badge: FC<BadgeProps> = ({
  disabled,
  onRemove,
  children,
  className,
  variant = 'DEFAULT',
  ...props
}) => (
  <span
    className={twMerge(
      'select-none w-fit flex items-center rounded border py-1 px-2 text-sm font-normal',
      variants[variant],
      disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'active:!border-info-content',
      className
    )}
    {...props}
  >
    {children}
    {onRemove && (
      <XMarkIcon
        onClick={!disabled ? onRemove : undefined}
        className={twMerge(
          'ml-1 h-5 w-5',
          removeButtonVariants[variant],
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        )}
      />
    )}
  </span>
)
