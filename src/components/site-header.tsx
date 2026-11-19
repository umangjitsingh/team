"use client";

import { cn } from "cn";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

// Anchor IDs are defined in team-plus-site.tsx - these warnings are false positives
// eslint-disable-next-line
const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Our work" },
  { href: "#about", label: "About us" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-19 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <a
          href="#top"
          aria-label="Team Plus Construction home"
          className="shrink-0"
        >
          <Image
            src="/TeamPlus_logo_light.svg"
            alt="Team Plus"
            width={180}
            height={70}
            className="h-11 w-auto dark:brightness-0 dark:invert"
            priority
          />
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="tel:+16474051729"
            className={cn(buttonVariants(), "hidden h-10 px-4 sm:inline-flex")}
          >
            <Phone />
            <span>647 405 1729</span>
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-border bg-background px-5 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+16474051729"
              className={cn(buttonVariants(), "mt-2 h-10")}
            >
              <Phone />
              Call 647 405 1729
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
