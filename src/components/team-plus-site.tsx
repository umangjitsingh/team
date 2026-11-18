import Image from 'next/image'
import {ArrowDown, ArrowRight, ArrowUpRight, Check, Hammer, MapPin, Phone, ShieldCheck} from 'lucide-react'

const services = [
    {
        number: '01',
        title: 'Concrete driveways',
        detail: 'A clean, durable first impression built for Canadian seasons.'
    },
    {
        number: '02',
        title: 'Patios & walkways',
        detail: 'Thoughtful outdoor spaces, from garden paths to complete backyard patios.'
    },
    {
        number: '03',
        title: 'Foundations & slabs',
        detail: 'Solid foundations, garage floors and basement slabs, poured with precision.'
    },
    {
        number: '04',
        title: 'Retaining walls',
        detail: 'Structural strength and considered finishes for changing grades.'
    },
    {
        number: '05',
        title: 'Legal basements',
        detail: 'New legal basement spaces planned and built to help you make more of home.'
    },
    {
        number: '06',
        title: 'Decorative concrete',
        detail: 'Exposed aggregate, stamped, coloured or classic plain concrete.'
    },
]

const projects = [
    {image: '/teamplus.tiff', title: 'A backyard made for gathering', type: 'Exposed aggregate · Patio'},
    {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
        title: 'Modern lines, lasting finish',
        type: 'Architectural concrete · Walkway'
    },
    {
        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85',
        title: 'Room to come home to',
        type: 'Residential construction · GTA'
    },
]

function Header() {
    return <header className="site-header"><a className="brand" href="#top"
                                              aria-label="Team Plus Construction home"><span
        className="brand-mark">TP<span>+</span></span><span className="brand-name">TEAM PLUS <small>CONSTRUCTION</small></span></a>
        <nav aria-label="Main navigation"><a href="#services">Services</a><a href="#work">Our work</a><a href="#about">About
            us</a></nav>
        <a className="header-call" href="tel://+16474051729"><Phone size={15}/> <span>647 405 1729</span><ArrowUpRight
            size={15}/></a></header>
}

function Hero() {
    return <section className="hero" id="top"><Image src="/team-plus-hero.png"
                                                     alt="A newly finished exposed-aggregate concrete patio beside a contemporary home"
                                                     fill priority sizes="100vw" className="hero-image"/>
        <div className="hero-shade"/>
        <div className="hero-content">
            <div className="eyebrow light"><span className="eyebrow-line"/> BUILT ON SOLID GROUND · SINCE 2015</div>
            <h1>Concrete work.<br/><em>Done right.</em></h1><p>From the first pour to the final finish, we build lasting
            concrete and living spaces for homes across the GTA.</p>
            <div className="hero-actions"><a className="button button-orange" href="tel://+16474051729">Get a free
                estimate <ArrowUpRight size={17}/></a><a className="text-link light-link" href="#services">Explore our
                services <ArrowDown size={15}/></a></div>
        </div>
        <div className="hero-side-note">TORONTO & THE GTA <span>·</span> ONTARIO</div>
        <div className="hero-bottom"><span>Residential concrete specialists</span><span>01 / 04</span></div>
    </section>
}

function Intro() {
    return <section className="intro section-pad" id="about">
        <div className="intro-label"><span className="eyebrow"><span className="eyebrow-line"/> YOUR LOCAL CONCRETE CREW</span>
            <p>Toronto · Ontario</p></div>
        <div className="intro-copy"><h2>Strong foundations.<br/><span>Better places to live.</span></h2><p
            className="intro-description">Team Plus Construction brings dependable workmanship and a personal approach
            to every project. Proudly serving Toronto and the GTA since 2015, we turn concrete plans into spaces built
            to last.</p><a className="text-link dark-link" href="#work">See what we build <ArrowRight size={16}/></a>
        </div>
        <div className="intro-stat"><strong>2015</strong><span>Building trust,<br/>one project at a time.</span></div>
    </section>
}

function Services() {
    return <section className="services section-pad" id="services">
        <div className="section-heading">
            <div><span className="eyebrow"><span className="eyebrow-line"/> WHAT WE DO</span><h2>One crew. <em>Every
                pour.</em></h2></div>
            <p>From groundwork to finishing touches, get the right team for your next concrete or basement project.</p>
        </div>
        <div className="service-grid">{services.map((service) => <article className="service-card" key={service.number}>
            <span className="service-number">{service.number}</span>
            <div className="service-icon"><Hammer size={18}/></div>
            <h3>{service.title}</h3><p>{service.detail}</p><ArrowUpRight className="service-arrow" size={18}/>
        </article>)}</div>
        <div className="finishes">
            <div className="finish-label">MAKE IT YOURS <span>—</span></div>
            <div className="finish-list"><span><i className="finish-dot aggregate"/>Exposed aggregate</span><span><i
                className="finish-dot stamped"/>Stamped</span><span><i
                className="finish-dot plain"/>Plain</span><span><i className="finish-dot colour"/>Coloured</span></div>
            <p>The finish is the difference.</p></div>
    </section>
}

export type GalleryItem = { id: string; title: string; alt: string; imageUrl: string }

function Work({gallery}: { gallery: GalleryItem[] }) {
    const displayedProjects = gallery.length
        ? gallery.slice(0, 6).map((photo) => ({
            image: photo.imageUrl,
            title: photo.title,
            type: 'Completed by Team Plus',
            alt: photo.alt
        }))
        : projects.map((project) => ({...project, alt: project.title}))

    return <section className="work section-pad" id="work">
        <div className="section-heading work-heading">
            <div><span className="eyebrow"><span className="eyebrow-line"/> BUILT BY TEAM PLUS</span><h2>Work that <em>speaks
                for itself.</em></h2></div>
            <a className="text-link dark-link" href="tel://+16474051729">Start your project <ArrowRight size={16}/></a>
        </div>
        <div className="project-grid">{displayedProjects.map((project, index) => <article
            className={`project-card project-${Math.min(index + 1, 3)}`} key={`${project.title}-${index}`}>
            <div className="project-image"><Image src={project.image} alt={project.alt} fill
                                                  sizes="(max-width: 700px) 100vw, 50vw"
                                                  unoptimized={project.image.startsWith('http')}/><span
                className="project-index">{String(index + 1).padStart(2, '0')}</span></div>
            <div className="project-caption">
                <div><h3>{project.title}</h3><p>{project.type}</p></div>
                <ArrowUpRight size={18}/></div>
        </article>)}</div>
        <p className="gallery-note"><ShieldCheck size={15}/> A selection of residential concrete and construction work
            across the GTA.</p></section>
}

function Basement() {
    return <section className="basement">
        <div className="basement-image" role="img" aria-label="Bright finished home interior"/>
        <div className="basement-content"><span className="eyebrow light"><span className="eyebrow-line"/> MORE ROOM TO LIVE</span>
            <h2>A basement with<br/><em>a brighter future.</em></h2><p>Thinking about a new legal basement? We help
                bring the vision to life with a practical, quality-first approach from the ground up.</p><a
                className="button button-outline" href="tel://+16474051729">Let&apos;s talk basements <ArrowUpRight
                size={17}/></a></div>
    </section>
}

function Footer() {
    return <footer className="footer">
        <div className="footer-top">
            <div><a className="brand footer-brand" href="#top"><span className="brand-mark">TP<span>+</span></span><span
                className="brand-name">TEAM PLUS <small>CONSTRUCTION</small></span></a><p>Built with care. Built to
                last.</p></div>
            <div className="footer-cta"><span className="eyebrow light">HAVE A PROJECT IN MIND?</span><a
                href="tel://+16474051729">Call 647 405 1729 <ArrowUpRight size={20}/></a><small>Call today for a free
                estimate.</small></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Team Plus Construction</span><span><MapPin
            size={14}/> Proudly serving Toronto & the GTA</span><a href="tel://+16474051729">647 405 1729</a><a
            className="owner-link" href="/admin/sign-in">Owner sign in</a></div>
    </footer>
}

export function TeamPlusSite({gallery}: { gallery: GalleryItem[] }) {
    return <><Header/>
        <main><Hero/><Intro/><Services/><Work gallery={gallery}/><Basement/>
            <section className="closing-cta"><span className="eyebrow"><span className="eyebrow-line"/> READY WHEN YOU ARE</span>
                <h2>Let&apos;s build<br/><em>something solid.</em></h2><a className="button button-orange"
                                                                          href="tel://+16474051729"><Phone
                    size={16}/> Call for a free estimate <ArrowUpRight size={16}/></a>
                <div className="closing-checks"><span><Check size={14}/> Free estimates</span><span><Check size={14}/> Local GTA team</span><span><Check
                    size={14}/> Since 2015</span></div>
            </section>
        </main>
        <Footer/></>
}
