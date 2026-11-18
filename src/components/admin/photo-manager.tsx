'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { authClient } from '@/lib/auth-client'

type Photo = {
  id: string
  title: string
  alt: string
  imageUrl: string
  createdAt: Date | string
}

const maxPhotoSize = 12 * 1024 * 1024

export function PhotoManager({ photos }: { photos: Photo[] }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [alt, setAlt] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [deletingId, setDeletingId] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!file) {
      setError('Choose a project photo first.')
      return
    }
    if (file.size > maxPhotoSize) {
      setError('Choose an image smaller than 12 MB.')
      return
    }

    setIsUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title.trim())
      formData.append('alt', alt.trim())

      const response = await fetch('/api/admin/uploads', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.message || 'Upload failed')
      }

      setTitle('')
      setAlt('')
      setFile(null)
      setMessage('Photo uploaded and added to the public project gallery.')
      router.refresh()
    } catch {
      setError('The photo could not be uploaded. Check the file and try again.')
    } finally {
      setIsUploading(false)
    }
  }

  async function handleDelete(photo: Photo) {
    if (!window.confirm(`Remove “${photo.title}” from the project gallery?`)) return

    setError('')
    setMessage('')
    setDeletingId(photo.id)

    try {
      const response = await fetch(`/api/admin/photos/${encodeURIComponent(photo.id)}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Delete failed')
      setMessage('Photo removed from the gallery.')
      router.refresh()
    } catch {
      setError('The photo could not be removed. Please try again.')
    } finally {
      setDeletingId('')
    }
  }

  async function handleSignOut() {
    await authClient.signOut()
    router.replace('/admin/sign-in')
    router.refresh()
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <a className="brand" href="/" aria-label="Team Plus Construction home">
          <span className="brand-mark">TP<span>+</span></span>
          <span className="brand-name">TEAM PLUS <small>CONSTRUCTION</small></span>
        </a>
        <div className="admin-topbar-actions">
          <a href="/" className="admin-site-link">View website</a>
          <button className="admin-signout" type="button" onClick={handleSignOut}>Sign out</button>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-page-heading">
          <div>
            <span className="admin-eyebrow">OWNER DASHBOARD</span>
            <h1>Project gallery</h1>
            <p>Share recent finished work with future customers.</p>
          </div>
          <div className="admin-photo-count"><strong>{photos.length}</strong><span>photos live</span></div>
        </div>

        <section className="admin-panel upload-panel" aria-labelledby="upload-heading">
          <div className="admin-panel-heading">
            <div><span className="admin-step">01</span><h2 id="upload-heading">Add a finished project</h2></div>
            <span className="admin-panel-note">JPEG, PNG, WebP or AVIF · up to 12 MB</span>
          </div>
          <form className="photo-upload-form" onSubmit={handleUpload}>
            <div className="admin-form-grid">
              <div className="admin-field">
                <label htmlFor="project-title">Project title</label>
                <input id="project-title" value={title} onChange={(event) => setTitle(event.target.value)} minLength={2} maxLength={100} placeholder="e.g. Exposed aggregate patio" required />
              </div>
              <div className="admin-field">
                <label htmlFor="project-alt">Describe the photo</label>
                <input id="project-alt" value={alt} onChange={(event) => setAlt(event.target.value)} minLength={5} maxLength={240} placeholder="A new patio beside a modern home" required />
                <span className="admin-field-hint">This description helps visitors using screen readers.</span>
              </div>
            </div>
            <div className="admin-upload-row">
              <div className="admin-field admin-file-field">
                <label htmlFor="project-photo">Photo file</label>
                <input id="project-photo" type="file" accept="image/jpeg,image/png,image/webp,image/avif" required onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
              </div>
              <button className="admin-primary-button upload-button" type="submit" disabled={isUploading || !file || !title.trim() || !alt.trim()}>
                {isUploading ? `Uploading ${progress}%` : 'Upload photo'}
              </button>
            </div>
            {isUploading && <div className="upload-progress" role="progressbar" aria-label="Photo upload progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>}
            {message && <p className="admin-status" role="status">{message}</p>}
            {error && <p className="form-error" role="alert">{error}</p>}
          </form>
        </section>

        <section className="admin-gallery-section" aria-labelledby="gallery-heading">
          <div className="admin-gallery-heading"><div><span className="admin-eyebrow">PUBLISHED WORK</span><h2 id="gallery-heading">Your photos</h2></div><p>Removing a photo also removes it from the public gallery.</p></div>
          {photos.length ? (
            <div className="admin-photo-grid">
              {photos.map((photo) => (
                <article className="admin-photo-card" key={photo.id}>
                  <div className="admin-photo-image"><Image src={photo.imageUrl} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 33vw" unoptimized /></div>
                  <div className="admin-photo-details"><div><h3>{photo.title}</h3><p>{new Intl.DateTimeFormat('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(photo.createdAt))}</p></div><button type="button" className="admin-delete-button" disabled={deletingId === photo.id} onClick={() => handleDelete(photo)} aria-label={`Remove ${photo.title}`}>{deletingId === photo.id ? 'Removing…' : 'Remove'}</button></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="admin-empty-state"><span className="admin-empty-mark">TP+</span><h3>Your next project can go here.</h3><p>Upload a finished-job photo above and it will appear on your website.</p></div>
          )}
        </section>
      </main>
    </div>
  )
}
