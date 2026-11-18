"use client";

import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { BrandMark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

type Photo = {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
  createdAt: Date | string;
};

const maxPhotoSize = 12 * 1024 * 1024;

export function PhotoManager({ photos }: { photos: Photo[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!file) {
      setError("Choose a project photo first.");
      return;
    }
    if (file.size > maxPhotoSize) {
      setError("Choose an image smaller than 12 MB.");
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title.trim());
      formData.append("alt", alt.trim());

      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message || "Upload failed");
      }

      setTitle("");
      setAlt("");
      setFile(null);
      setMessage("Photo uploaded and added to the public project gallery.");
      router.refresh();
    } catch {
      setError(
        "The photo could not be uploaded. Check the file and try again.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(photo: Photo) {
    if (!window.confirm(`Remove “${photo.title}” from the project gallery?`))
      return;

    setError("");
    setMessage("");
    setDeletingId(photo.id);

    try {
      const response = await fetch(
        `/api/admin/photos/${encodeURIComponent(photo.id)}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) throw new Error("Delete failed");
      setMessage("Photo removed from the gallery.");
      router.refresh();
    } catch {
      setError("The photo could not be removed. Please try again.");
    } finally {
      setDeletingId("");
    }
  }

  async function handleSignOut() {
    await authClient.signOut();
    router.replace("/admin/sign-in");
    router.refresh();
  }

  return (
    <div className="min-h-svh bg-muted/40">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <Link href="/" aria-label="Team Plus Construction home">
            <BrandMark />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline" }), "h-8")}
            >
              View website
            </Link>
            <Button
              variant="ghost"
              className="h-8"
              type="button"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Owner dashboard
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
              Project gallery
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Share recent finished work with future customers.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card px-5 py-4">
            <strong className="block font-serif text-3xl font-normal">
              {photos.length}
            </strong>
            <span className="text-xs text-muted-foreground">photos live</span>
          </div>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-6 pt-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-widest text-primary">
                  01
                </span>
                <h2
                  id="upload-heading"
                  className="text-xl font-semibold tracking-tight"
                >
                  Add a finished project
                </h2>
              </div>
              <p className="text-xs text-muted-foreground">
                JPEG, PNG, WebP or AVIF · up to 12 MB
              </p>
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleUpload}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="project-title">Project title</Label>
                  <Input
                    id="project-title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    minLength={2}
                    maxLength={100}
                    placeholder="e.g. Exposed aggregate patio"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="project-alt">Describe the photo</Label>
                  <Input
                    id="project-alt"
                    value={alt}
                    onChange={(event) => setAlt(event.target.value)}
                    minLength={5}
                    maxLength={240}
                    placeholder="A new patio beside a modern home"
                    required
                  />
                  <span className="text-xs text-muted-foreground">
                    This description helps visitors using screen readers.
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex flex-1 flex-col gap-2">
                  <Label htmlFor="project-photo">Photo file</Label>
                  <Input
                    id="project-photo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    required
                    onChange={(event) =>
                      setFile(event.target.files?.[0] ?? null)
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="h-10"
                  disabled={
                    isUploading || !file || !title.trim() || !alt.trim()
                  }
                >
                  {isUploading ? `Uploading ${progress}%` : "Upload photo"}
                </Button>
              </div>
              {isUploading ? (
                <div
                  className="h-1.5 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-label="Photo upload progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                >
                  <span
                    className="block h-full bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              ) : null}
              {message ? (
                <output className="text-sm text-foreground">{message}</output>
              ) : null}
              {error ? (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          </CardContent>
        </Card>

        <section
          aria-labelledby="gallery-heading"
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Published work
              </p>
              <h2
                id="gallery-heading"
                className="mt-1 text-2xl font-semibold tracking-tight"
              >
                Your photos
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Removing a photo also removes it from the public gallery.
            </p>
          </div>
          {photos.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <article
                  key={photo.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="relative h-52 bg-muted">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 700px) 100vw, 33vw"
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-3 p-4">
                    <div>
                      <h3 className="text-sm font-semibold">{photo.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Intl.DateTimeFormat("en-CA", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(photo.createdAt))}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={deletingId === photo.id}
                      onClick={() => handleDelete(photo)}
                      aria-label={`Remove ${photo.title}`}
                    >
                      {deletingId === photo.id ? "Removing…" : "Remove"}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
              <span className="text-2xl font-black tracking-tighter">
                TP<span className="text-primary">+</span>
              </span>
              <h3 className="mt-3 text-lg font-semibold">
                Your next project can go here.
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                Upload a finished-job photo above and it will appear on your
                website.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
