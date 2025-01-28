import type { SVGIconProps } from '@/_types'

export type CardProps = {
  type?: string
  label: string
  href?: string
  action: string
  Icon: SVGIconProps
  description: string
  onClick?: () => void
}
