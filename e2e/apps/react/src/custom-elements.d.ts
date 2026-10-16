// <iu-button> JSX types come from the generated React port.
/// <reference types="@intuition-ui/react" />
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

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
      'iu-event-probe': IuEventProbeProps
    }
  }
}
