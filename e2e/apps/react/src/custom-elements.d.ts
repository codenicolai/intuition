import type { IuButton } from '@intuition-ui/core'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type IuButtonProps = DetailedHTMLProps<HTMLAttributes<IuButton>, IuButton> &
  Partial<Pick<IuButton, 'variant' | 'size' | 'disabled' | 'type'>>

type ProbeHandler = (event: CustomEvent<{ count: number; name: string }>) => void

type IuEventProbeProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  'oniu-press'?: ProbeHandler
  oniupress?: ProbeHandler
  oniuPress?: ProbeHandler
  onIuPress?: ProbeHandler
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'iu-button': IuButtonProps
      'iu-event-probe': IuEventProbeProps
    }
  }
}
