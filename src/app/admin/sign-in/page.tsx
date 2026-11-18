import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SignInForm } from '@/components/admin/sign-in-form'
import { getAdminSession } from '@/lib/admin-auth'

export const metadata = { title: 'Owner sign in | Team Plus Construction' }

export default async function AdminSignInPage() {
  const session = await getAdminSession()
  if (session) redirect('/admin')

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <Link className="brand" href="/" aria-label="Team Plus Construction home">
          <span className="brand-mark">TP<span>+</span></span>
          <span className="brand-name">TEAM PLUS <small>CONSTRUCTION</small></span>
        </Link>
        <span className="admin-eyebrow">OWNER ACCESS</span>
        <h1>Welcome back.</h1>
        <p className="admin-auth-intro">Sign in to update your project gallery.</p>
        <SignInForm />
        <Link className="admin-back-link" href="/">Back to the website</Link>
      </section>
    </main>
  )
}
