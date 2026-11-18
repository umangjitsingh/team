import { NextResponse, type NextRequest } from 'next/server'
import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '@/lib/auth'

const { GET, POST: handleAuthPost } = toNextJsHandler(auth)

export { GET }

export async function POST(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith('/sign-up/email')) {
    return NextResponse.json({ message: 'Owner setup is required to create the first account.' }, { status: 403 })
  }

  return handleAuthPost(request)
}
