import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent } from "@/components/ui/card";

export function AuthShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="relative flex min-h-svh items-center justify-center bg-muted/50 px-4 py-16">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col gap-4 pt-8">
          <Link
            href="/"
            aria-label="Team Plus Construction home"
            className="w-fit"
          >
            <BrandMark />
          </Link>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm leading-6 text-muted-foreground">{intro}</p>
          {children}
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Back to the website
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
