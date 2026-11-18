import { v2 as cloudinary } from 'cloudinary'
import { NextResponse, type NextRequest } from 'next/server'
import { getAdminSessionForRequest } from '@/lib/admin-auth'
import { db } from '@/lib/db'

const allowedContentTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const maximumSizeInBytes = 12 * 1024 * 1024

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSessionForRequest(request)
    if (!session) {
      return NextResponse.json({ message: 'Upload is not authorized.' }, { status: 401 })
    }

    // Check photo limit (max 27)
    const photoCount = await db.projectGallery.count({
      where: { userId: session.user.id },
    })
    if (photoCount >= 27) {
      return NextResponse.json(
        { message: 'Maximum photo limit reached (27). Delete some photos before uploading more.' },
        { status: 40 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const alt = formData.get('alt') as string

    if (!file || !title || !alt) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 })
    }

    if (!allowedContentTypes.includes(file.type)) {
      return NextResponse.json({ message: 'Invalid file type. Use JPEG, PNG, WebP, or AVIF.' }, { status: 400 })
    }

    if (file.size > maximumSizeInBytes) {
      return NextResponse.json({ message: 'File too large. Maximum size is 12 MB.' }, { status: 400 })
    }

    const trimmedTitle = title.trim()
    const trimmedAlt = alt.trim()

    if (trimmedTitle.length < 2 || trimmedTitle.length > 100 || trimmedAlt.length < 5 || trimmedAlt.length > 240) {
      return NextResponse.json({ message: 'Invalid title or alt text length.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'teamplus-projects',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    const result = uploadResult as { public_id: string; secure_url: string }

    await db.projectGallery.create({
      data: {
        id: result.public_id,
        userId: session.user.id,
        title: trimmedTitle,
        alt: trimmedAlt,
        imageUrl: result.secure_url,
        blobUrl: result.secure_url,
      },
    })

    return NextResponse.json({ success: true, url: result.secure_url })
  } catch (error) {
    console.error('[Cloudinary] Project photo upload failed:', error)
    console.error('[Cloudinary] Config check:', {
      hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    })
    return NextResponse.json({ message: 'The photo could not be uploaded. Please try again.' }, { status: 400 })
  }
}
