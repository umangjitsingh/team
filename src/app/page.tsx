import { TeamPlusSite } from '@/components/team-plus-site'
import { db } from '@/lib/db'

export default async function Page() {
  let gallery: { id: string; title: string; alt: string; imageUrl: string }[] = []

  try {
    gallery = await db.projectGallery.findMany({
      select: {
        id: true,
        title: true,
        alt: true,
        imageUrl: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 6,
    })
    console.log('[Homepage] Gallery loaded:', gallery.length, 'photos')
  } catch (error) {
    console.error('[Homepage] Project gallery could not be loaded:', error)
  }

  return <TeamPlusSite gallery={gallery}/>
}