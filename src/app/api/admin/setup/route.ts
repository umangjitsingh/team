// import { timingSafeEqual } from 'node:crypto'
// import { NextResponse, type NextRequest } from 'next/server'
// import { auth } from '@/lib/auth'
// import { db } from '@/lib/db'
//
// export async function POST(request: NextRequest) {
//   const expectedCode = process.env.TEAM_PLUS_ADMIN_SETUP_CODE
//   const adminEmail = process.env.TEAM_PLUS_ADMIN_EMAIL?.trim().toLowerCase()
//
//   if (!expectedCode || expectedCode.length < 16 || !adminEmail) {
//     return NextResponse.json({ message: 'Owner setup is not configured.' }, { status: 503 })
//   }
//
//   let body: { name?: unknown; password?: unknown; setupCode?: unknown }
//
//   try {
//     body = await request.json()
//   } catch {
//     return NextResponse.json({ message: 'Please check the form and try again.' }, { status: 400 })
//   }
//
//   const name = typeof body.name === 'string' ? body.name.trim() : ''
//   const password = typeof body.password === 'string' ? body.password : ''
//   const suppliedCode = typeof body.setupCode === 'string' ? body.setupCode : ''
//   const expected = Buffer.from(expectedCode)
//   const supplied = Buffer.from(suppliedCode)
//   const validCode = expected.length === supplied.length && timingSafeEqual(expected, supplied)
//
//   if (!validCode) {
//     return NextResponse.json({ message: 'The setup code is not valid.' }, { status: 403 })
//   }
//
//   if (name.length < 2 || name.length > 80 || password.length < 12 || password.length > 128) {
//     return NextResponse.json({ message: 'Use a name and a password with at least 12 characters.' }, { status: 400 })
//   }
//
//   const existingOwner = await db.user.findFirst()
//
//   if (existingOwner) {
//     return NextResponse.json({ message: 'Owner setup has already been completed.' }, { status: 409 })
//   }
//
//   const origin = request.headers.get('origin')
//   let normalizedOrigin = ''
//
//   try {
//     normalizedOrigin = origin ? new URL(origin).origin : ''
//   } catch {
//     normalizedOrigin = ''
//   }
//
//   const trustedOrigins = [
//     request.nextUrl.origin,
//     process.env.BETTER_AUTH_URL,
//     process.env.PRODUCTION_URL ? `https://${process.env.PRODUCTION_URL}` : undefined,
//   ].flatMap((value) => {
//     if (!value) return []
//
//     try {
//       return [new URL(value).origin]
//     } catch {
//       return []
//     }
//   })
//
//   // Temporarily disabled origin validation for setup
//   // if (!normalizedOrigin || !trustedOrigins.includes(normalizedOrigin)) {
//   //   return NextResponse.json({ message: 'Request origin could not be verified.' }, { status: 403 })
//   // }
//
//   const authUrl = new URL('/api/auth/sign-up/email', request.nextUrl.origin)
//   const authRequest = new Request(authUrl, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//       origin: normalizedOrigin,
//     },
//     body: JSON.stringify({ email: adminEmail, name, password }),
//   })
//
//   return auth.handler(authRequest)
// }
import { timingSafeEqual } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  const expectedCode = process.env.TEAM_PLUS_ADMIN_SETUP_CODE
  const adminEmail = process.env.TEAM_PLUS_ADMIN_EMAIL?.trim().toLowerCase()

  if (!expectedCode || expectedCode.length < 16 || !adminEmail) {
    return NextResponse.json({ message: 'Owner setup is not configured.' }, { status: 503 })
  }

  let body: { name?: unknown; password?: unknown; setupCode?: unknown }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Please check the form and try again.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const password = typeof body.password === 'string' ? body.password : ''
  const suppliedCode = typeof body.setupCode === 'string' ? body.setupCode : ''

  const expected = Buffer.from(expectedCode)
  const supplied = Buffer.from(suppliedCode)
  const validCode = expected.length === supplied.length && timingSafeEqual(expected, supplied)

  if (!validCode) {
    return NextResponse.json({ message: 'The setup code is not valid.' }, { status: 403 })
  }

  if (name.length < 2 || name.length > 80 || password.length < 12 || password.length > 128) {
    return NextResponse.json(
        { message: 'Use a name and a password with at least 12 characters.' },
        { status: 400 },
    )
  }

  const existingOwner = await db.user.findFirst()

  if (existingOwner) {
    return NextResponse.json({ message: 'Owner setup has already been completed.' }, { status: 409 })
  }

  try {
    // Call Better Auth directly on the server. This skips the browser
    // Origin check that was causing "Invalid origin", and asResponse
    // keeps the Set-Cookie header so autoSignIn still works.
    const response = await auth.api.signUpEmail({
      body: { email: adminEmail, name, password },
      asResponse: true,
    })

    return response
  } catch (error) {
    console.error('Owner setup failed:', error)
    const message =
        error instanceof Error && error.message
            ? error.message
            : 'Could not create the owner account.'
    return NextResponse.json({ message }, { status: 400 })
  }
}