import { v2 as cloudinary } from 'cloudinary'
import { NextResponse, type NextRequest } from 'next/server'
import { getAdminSessionForRequest } from '@/lib/admin-auth'
import { db } from '@/lib/db'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getAdminSessionForRequest(request)

  if (!session) {
    return NextResponse.json({ message: 'Sign in as the owner to manage project photos.' }, { status: 401 })
  }

  const { id } = await context.params
  const photo = await db.projectGallery.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  })

  if (!photo) {
    return NextResponse.json({ message: 'That project photo could not be found.' }, { status: 404 })
  }

  try {
    await cloudinary.uploader.destroy(photo.id)
    await db.projectGallery.delete({
      where: {
        id,
        userId: session.user.id,
      },
    })
  } catch (error) {
    console.error('[v0] Project photo deletion failed:', error)
    return NextResponse.json({ message: 'The photo could not be deleted. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
