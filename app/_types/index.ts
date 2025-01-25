import type { ForwardRefExoticComponent, SVGProps } from 'react'

export type SVGIconProps = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'>
>
