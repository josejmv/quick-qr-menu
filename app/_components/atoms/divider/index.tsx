// main tools
import { twMerge } from 'tailwind-merge'

// types
import type { DividerProps } from './types'
import type { FC } from 'react'

export const Divider: FC<DividerProps> = ({
  children,
  className,
  containerClassName,
  ...props
}) => (
  <div
    {...props}
    className={twMerge(
      children &&
        'flex w-full items-center gap-2 text-sm text-secondary-content font-normal',
      containerClassName
    )}
  >
    <div
      aria-roledescription='decorator'
      aria-orientation='horizontal'
      className={twMerge('h-[2px] bg-base-300 grow', className)}
    />
    {children && (
      <>
        {children}
        <div
          aria-roledescription='decorator'
          aria-orientation='horizontal'
          className={twMerge('h-[2px] bg-base-300 grow', className)}
        />
      </>
    )}
  </div>
)
