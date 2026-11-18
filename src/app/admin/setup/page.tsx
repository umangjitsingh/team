import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SetupForm } from '@/components/admin/setup-form'
import { getAdminSession } from '@/lib/admin-auth'
import { db } from '@/lib/db'

export const metadata = { title: 'Set up owner access | Team Plus Construction' }

export default async function AdminSetupPage() {
  const session = await getAdminSession()
  if (session) redirect('/admin')

  const existingAccount = await db.user.findFirst()
  if (existingAccount) redirect('/admin/sign-in')

  const adminEmail = process.env.TEAM_PLUS_ADMIN_EMAIL?.trim() ?? ''
  const setupConfigured = Boolean(adminEmail && (process.env.TEAM_PLUS_ADMIN_SETUP_CODE?.length ?? 0) >= 16)

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <Link className="brand" href="/" aria-label="Team Plus Construction home">
          <span className="brand-mark">TP<span>+</span></span>
          <span className="brand-name">TEAM PLUS <small>CONSTRUCTION</small></span>
        </Link>
        <span className="admin-eyebrow">FIRST-TIME OWNER SETUP</span>
        <h1>Claim your gallery.</h1>
        <p className="admin-auth-intro">Create the owner account to add and manage finished project photos.</p>
        {setupConfigured ? <SetupForm email={adminEmail} /> : <p className="form-error" role="alert">Set TEAM_PLUS_ADMIN_SETUP_CODE to at least 16 characters in project Vars, then return here.</p>}
        <Link className="admin-back-link" href="/">Back to the website</Link>
      </section>
    </main>
  )
}
