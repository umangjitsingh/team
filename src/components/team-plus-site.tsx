import { cn } from "cn";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Hammer,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { BrandMark } from "@/components/brand";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";

const phoneHref = "tel:+16474051729";

const services = [
  {
    number: "01",
    title: "Concrete driveways",
    detail: "A clean, durable first impression built for Canadian seasons.",
  },
  {
    number: "02",
    title: "Patios & walkways",
    detail:
      "Thoughtful outdoor spaces, from garden paths to complete backyard patios.",
  },
  {
    number: "03",
    title: "Foundations & slabs",
    detail:
      "Solid foundations, garage floors and basement slabs, poured with precision.",
  },
  {
    number: "04",
    title: "Retaining walls",
    detail: "Structural strength and considered finishes for changing grades.",
  },
  {
    number: "05",
    title: "Legal basements",
    detail:
      "New legal basement spaces planned and built to help you make more of home.",
  },
  {
    number: "06",
    title: "Decorative concrete",
    detail: "Exposed aggregate, stamped, coloured or classic plain concrete.",
  },
];

const finishes = [
  {
    label: "Exposed aggregate",
    className:
      "bg-[radial-gradient(circle_at_4px_5px,#f6f1e6_1px,#8e918b_1px_2px,#e6e3d8_2px_3px,#9c9b92_3px)]",
  },
  {
    label: "Stamped",
    className:
      "bg-[repeating-linear-gradient(45deg,#b6a78e_0_2px,#ddd2bf_2px_4px)]",
  },
  { label: "Plain", className: "bg-muted-foreground" },
  { label: "Coloured", className: "bg-primary" },
];

const fallbackProjects = [
  {
    image: "/teamplus.tiff",
    title: "A backyard made for gathering",
    type: "Exposed aggregate · Patio",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    title: "Modern lines, lasting finish",
    type: "Architectural concrete · Walkway",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
    title: "Room to come home to",
    type: "Residential construction · GTA",
  },
];

function Eyebrow({
  children,
  light = false,
}: {
  children: string;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase",
        light ? "text-white/80" : "text-muted-foreground",
      )}
    >
      <span className="inline-block h-px w-6 bg-primary" />
      {children}
    </p>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[36rem] overflow-hidden text-white lg:min-h-[42rem]"
    >
      <Image
        src="/team_plus_hero.avif"
        alt="A newly finished exposed-aggregate concrete patio beside a contemporary home"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_56%] saturate-75"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[36rem] max-w-7xl flex-col justify-center px-5 py-20 md:px-8 lg:min-h-[42rem]">
        <div className="max-w-xl">
          <Eyebrow light>Built on solid ground · since 2015</Eyebrow>
          <h1 className="mt-6 text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl">
            Concrete work.
            <br />
            <em className="font-serif font-normal italic">Done right.</em>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/85">
            From the first pour to the final finish, we build lasting concrete
            and living spaces for homes across the GTA.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={phoneHref}
              className={cn(buttonVariants({ size: "lg" }), "h-12 px-5")}
            >
              Get a free estimate
              <ArrowUpRight />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary"
            >
              Explore our services
              <ArrowDown className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <p className="absolute top-1/2 right-6 hidden -translate-y-1/2 text-[10px] tracking-[0.22em] text-white/75 [writing-mode:vertical-rl] lg:block">
        TORONTO & THE GTA <span className="text-primary">·</span> ONTARIO
      </p>

      <div className="absolute right-5 bottom-6 left-5 flex items-end justify-between gap-4 md:right-8 md:left-8">
        <p className="text-[11px] tracking-[0.16em] text-white/75 uppercase">
          Residential concrete specialists
        </p>
        <Image
          src="/teamplus_qr.png"
          alt="QR code for Team Plus"
          width={96}
          height={96}
          className="size-20 rounded-xl bg-white/90 p-1 sm:size-24"
        />
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section id="about" className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-[0.8fr_1.6fr_0.7fr] lg:items-start lg:py-24">
        <div className="flex items-start justify-between gap-6 lg:block">
          <Eyebrow>Your local concrete crew</Eyebrow>
          <p className="text-sm text-muted-foreground lg:mt-4">
            Toronto · Ontario
          </p>
        </div>
        <div>
          <h2 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
            Strong foundations.
            <br />
            <span className="font-serif font-normal text-muted-foreground italic">
              Better places to live.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Team Plus Construction brings dependable workmanship and a personal
            approach to every project. Proudly serving Toronto and the GTA since
            2015, we turn concrete plans into spaces built to last.
          </p>
          <a
            href="#work"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:text-primary"
          >
            See what we build
            <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="border-t border-border pt-5 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-8">
          <strong className="block font-serif text-4xl font-normal">
            2015
          </strong>
          <span className="mt-2 block text-sm leading-6 text-muted-foreground">
            Building trust, one project at a time.
          </span>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-muted/60">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              One crew.{" "}
              <em className="font-serif font-normal italic">Every pour.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">
            From groundwork to finishing touches, get the right team for your
            next concrete or basement project.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.number}
              className="group relative min-h-52 bg-card p-6"
            >
              <span className="absolute top-6 right-6 text-[11px] tracking-widest text-muted-foreground">
                {service.number}
              </span>
              <div className="grid size-10 place-items-center rounded-lg border border-border bg-background text-primary">
                <Hammer className="size-4" />
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                {service.detail}
              </p>
              <ArrowUpRight className="absolute right-6 bottom-6 size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-5 border-y border-border py-5 lg:flex-row lg:items-center">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase">
            Make it yours <span className="text-primary">—</span>
          </p>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-6">
            {finishes.map((finish) => (
              <span
                key={finish.label}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span
                  className={cn(
                    "inline-block size-3.5 rounded-full border border-border",
                    finish.className,
                  )}
                />
                {finish.label}
              </span>
            ))}
          </div>
          <p className="font-serif text-sm text-muted-foreground italic lg:ml-auto">
            The finish is the difference.
          </p>
        </div>
      </div>
    </section>
  );
}

export type GalleryItem = {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
};

function Work({ gallery }: { gallery: GalleryItem[] }) {
  const displayedProjects = gallery.length
    ? gallery.slice(0, 6).map((photo) => ({
        image: photo.imageUrl,
        title: photo.title,
        type: "Completed by Team Plus",
        alt: photo.alt,
      }))
    : fallbackProjects.map((project) => ({ ...project, alt: project.title }));

  return (
    <section id="work" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Built by Team Plus</Eyebrow>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Work that{" "}
              <em className="font-serif font-normal italic">
                speaks for itself.
              </em>
            </h2>
          </div>
          <a
            href={phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary"
          >
            Start your project
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {displayedProjects.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className={cn("group min-w-0", index === 0 && "sm:col-span-2")}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl bg-muted",
                  index === 0 ? "h-80 sm:h-[28rem]" : "h-72",
                )}
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  unoptimized={project.image.startsWith("http")}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute top-4 left-4 rounded-md bg-background/90 px-2.5 py-1 text-[11px] font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 pt-4">
                <div>
                  <h3 className="text-sm font-semibold">{project.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {project.type}
                  </p>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-primary" />
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="size-4 text-primary" />A selection of
          residential concrete and construction work across the GTA.
        </p>
      </div>
    </section>
  );
}

function Basement() {
  return (
    <section className="grid bg-zinc-950 text-white lg:grid-cols-2">
      <div
        className="min-h-64 bg-cover bg-center"
        role="img"
        aria-label="Bright finished home interior"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,.15), rgba(0,0,0,.15)), url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85')",
        }}
      />
      <div className="flex flex-col justify-center px-5 py-16 md:px-12 lg:py-20">
        <Eyebrow light>More room to live</Eyebrow>
        <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          A basement with
          <br />
          <em className="font-serif font-normal italic">a brighter future.</em>
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
          Thinking about a new legal basement? We help bring the vision to life
          with a practical, quality-first approach from the ground up.
        </p>
        <a
          href={phoneHref}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-8 h-12 w-fit border-white/40 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white",
          )}
        >
          Let&apos;s talk basements
          <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="bg-muted px-5 py-20 text-center md:px-8">
      <Eyebrow>Ready when you are</Eyebrow>
      <h2 className="mx-auto mt-5 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">
        Let&apos;s build
        <br />
        <em className="font-serif font-normal italic">something solid.</em>
      </h2>
      <a
        href={phoneHref}
        className={cn(buttonVariants({ size: "lg" }), "mt-8 h-12 px-5")}
      >
        <Phone />
        Call for a free estimate
        <ArrowUpRight />
      </a>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {["Free estimates", "Local GTA team", "Since 2015"].map((item) => (
          <span key={item} className="inline-flex items-center gap-1.5">
            <Check className="size-4 text-primary" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 border-b border-white/15 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a href="#top" aria-label="Team Plus Construction home">
              <BrandMark inverted />
            </a>
            <p className="mt-4 text-sm text-white/65">
              Built with care. Built to last.
            </p>
          </div>
          <div className="sm:text-right">
            <Eyebrow light>Have a project in mind?</Eyebrow>
            <a
              href={phoneHref}
              className="mt-3 inline-flex items-center gap-2 font-serif text-2xl hover:text-primary"
            >
              Call 647 405 1729
              <ArrowUpRight className="size-5 text-primary" />
            </a>
            <p className="mt-2 text-sm text-white/65">
              Call today for a free estimate.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Team Plus Construction</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary" />
            Proudly serving Toronto & the GTA
          </span>
          <a href={phoneHref} className="hover:text-white">
            647 405 1729
          </a>
          <a href="/admin/sign-in" className="hover:text-primary">
            Owner sign in
          </a>
        </div>
      </div>
    </footer>
  );
}

export function TeamPlusSite({ gallery }: { gallery: GalleryItem[] }) {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Work gallery={gallery} />
        <Basement />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
