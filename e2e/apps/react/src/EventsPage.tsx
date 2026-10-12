import { useState } from 'react'

type Counts = { hyphen: number; lower: number; camel: number; pascal: number }

export default function EventsPage() {
  const [counts, setCounts] = useState<Counts>({ hyphen: 0, lower: 0, camel: 0, pascal: 0 })
  const hit = (key: keyof Counts) => () => setCounts((c) => ({ ...c, [key]: c[key] + 1 }))

  return (
    <main>
      <h1>Event naming in React</h1>
      <iu-event-probe
        oniu-press={hit('hyphen')}
        oniupress={hit('lower')}
        oniuPress={hit('camel')}
        onIuPress={hit('pascal')}
      ></iu-event-probe>
      <ul>
        <li>oniu-press: <span data-testid="hyphen">{counts.hyphen}</span></li>
        <li>oniupress: <span data-testid="lower">{counts.lower}</span></li>
        <li>oniuPress: <span data-testid="camel">{counts.camel}</span></li>
        <li>onIuPress: <span data-testid="pascal">{counts.pascal}</span></li>
      </ul>
    </main>
  )
}
