import { redirect } from 'next/navigation'
import { PhotoManager } from '@/components/admin/photo-manager'
import { getAdminSession } from '@/lib/admin-auth'
import { db } from '@/lib/db'

export const metadata = { title: 'Project gallery | Team Plus Construction' }

export default async function AdminPage() {
  const session = await getAdminSession()
  if (!session) redirect('/admin/sign-in')

  const photos = await db.projectGallery.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return <PhotoManager photos={photos} />
}
