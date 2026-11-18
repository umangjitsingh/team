'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export function SetupForm({ email }: { email: string }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [setupCode, setSetupCode] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, password, setupCode }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        setError(result?.message ?? 'Owner setup could not be completed. Check the code and try again.')
        return
      }

      router.replace('/admin')
      router.refresh()
    } catch {
      setError('Owner setup could not be completed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-account-email"><span>Owner account</span><strong>{email || 'Owner email is not configured'}</strong></div>
      <label htmlFor="owner-name">Your name</label>
      <input id="owner-name" autoComplete="name" minLength={2} maxLength={80} required value={name} onChange={(event) => setName(event.target.value)} />
      <label htmlFor="setup-code">One-time setup code</label>
      <input id="setup-code" type="password" autoComplete="off" required value={setupCode} onChange={(event) => setSetupCode(event.target.value)} />
      <label htmlFor="new-password">Create a password</label>
      <input id="new-password" type="password" autoComplete="new-password" minLength={12} maxLength={128} required value={password} onChange={(event) => setPassword(event.target.value)} />
      <p className="admin-field-hint">Use at least 12 characters. The setup code is used only to claim the first owner account.</p>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="admin-primary-button" type="submit" disabled={isSubmitting || !email}>
        {isSubmitting ? 'Setting up account…' : 'Create owner account'}
      </button>
    </form>
  )
}
