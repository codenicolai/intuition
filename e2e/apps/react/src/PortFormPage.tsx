import { Button } from '@intuition-ui/react'
import { useState, type FormEvent } from 'react'

export default function PortFormPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setResult('')
    await new Promise((resolve) => setTimeout(resolve, 600))
    setResult(`Sent: ${name} <${email}>: ${message}`)
    setSending(false)
  }

  function handleReset() {
    setName('')
    setEmail('')
    setMessage('')
    setResult('')
  }

  return (
    <main>
      <h1>Intuition UI in React</h1>
      <p>Test page for iu-button inside a native form.</p>

      <form onSubmit={handleSubmit} onReset={handleReset}>
        <label>
          Name
          <input name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          E-mail
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <div>
          <Button type="submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send'}
          </Button>
          <Button type="reset" variant="secondary">
            Clear
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setResult('Ghost clicked')}>
            Ghost
          </Button>
        </div>
      </form>

      {result && <p>{result}</p>}
    </main>
  )
}
