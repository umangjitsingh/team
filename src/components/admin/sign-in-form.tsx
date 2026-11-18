'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const result = await authClient.signIn.email({ email, password, callbackURL: '/admin' })
      if (result.error) {
        setError('We could not sign you in. Check your details and try again.')
        return
      }

      router.replace('/admin')
      router.refresh()
    } catch {
      setError('We could not sign you in. Check your details and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label htmlFor="owner-email">Email address</label>
      <input id="owner-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
      <label htmlFor="owner-password">Password</label>
      <input id="owner-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="admin-primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
