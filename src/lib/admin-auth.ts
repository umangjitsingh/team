import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const adminEmail = process.env.TEAM_PLUS_ADMIN_EMAIL?.trim().toLowerCase()

export async function getAdminSession(requestHeaders?: Headers) {
  const session = await auth.api.getSession({
    headers: requestHeaders ?? (await headers()),
  })

  if (!session?.user || !adminEmail || session.user.email.toLowerCase() !== adminEmail) {
    return null
  }

  return session
}

export async function getAdminSessionForRequest(request: Request) {
  const origin = request.headers.get('origin')

  if (!origin) return null

  try {
    if (new URL(origin).origin !== new URL(request.url).origin) return null
  } catch {
    return null
  }

  return getAdminSession(request.headers)
}
