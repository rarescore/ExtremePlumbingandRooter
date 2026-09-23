import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clock3, ShieldCheck, Star } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { InViewVideo, VideoBackground } from "@/components/VideoBackground";
import { SiteShell } from "@/components/layout/SiteShell";
import { buttonVariants } from "@/components/ui/button";
import { articleCards as articles } from "@/lib/articles-meta";
import { formatArticleDate } from "@/lib/article-covers";
import {
  LICENSE_NUMBER,
  PHONE_DISPLAY,
  PHONE_HREF,
  areas,
  canonical,
  faqs,
  processSteps,
  services,
  socialLinks,
  team,
  testimonials,
} from "@/lib/site";
import { videos } from "@/lib/videos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Extreme Plumbing & Rooter | 24/7 Los Angeles Plumber" },
      {
        name: "description",
        content:
          "24/7 licensed plumbing and rooter service throughout Los Angeles. Camera inspections, drain cleaning, sewer repair, water heaters, and free no-pressure estimates.",
      },
    ],
    links: [{ rel: "canonical", href: canonical("/") }],
  }),
});

function Home() {
  return (
    <SiteShell>
      <main id="main">
        <section className="relative isolate min-h-[100svh] overflow-hidden bg-navy text-cream">
          <VideoBackground src={videos.hero.src} poster={videos.hero.poster} priority className="hero-live" />
          <div className="hero-wash absolute inset-0" aria-hidden="true" />
          <div className="shell relative flex min-h-[100svh] flex-col justify-end pt-28 pb-16 md:justify-center md:pb-24">
            <p className="hero-stagger kicker kicker-light">Fast. Reliable. Professional.</p>
            <h1 className="hero-stagger display max-w-2xl text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              Professional plumbing services in Los Angeles
            </h1>
            <p className="hero-stagger mt-5 max-w-lg text-base leading-relaxed text-cream/80">
              Licensed, insured, and available 24/7. From emergency repairs to complete installations — we inspect first
              and give a free estimate before any work begins.
            </p>
            <div className="hero-stagger mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
                Get a free estimate
              </Link>
              <a href={PHONE_HREF} className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
                Call now · {PHONE_DISPLAY}
              </a>
            </div>
            <ul className="hero-stagger mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-cream/85">
              <li className="flex items-center gap-2">
                <Clock3 className="size-4 shrink-0 text-brand" aria-hidden="true" />
                24/7 emergency service
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0 text-brand" aria-hidden="true" />
                Licensed & insured · #{LICENSE_NUMBER}
              </li>
              <li className="flex items-center gap-2">
                <Star className="size-4 shrink-0 text-brand" aria-hidden="true" />
                5-star rated
              </li>
            </ul>
          </div>
        </section>

        <section className="border-b border-line bg-cream" aria-label="Service promise">
          <div className="shell grid md:grid-cols-3">
            {[
              ["Free inspection & estimate", "No obligation"],
              ["Upfront options", "You approve before work begins"],
              ["Greater Los Angeles", "Homes, businesses & high-rises"],
            ].map(([title, copy]) => (
              <p key={title} className="border-line px-0 py-6 md:border-r md:px-8 md:py-7 md:first:pl-0 last:border-r-0">
                <strong className="block text-sm tracking-[0.08em] text-navy uppercase">{title}</strong>
                <span className="mt-1 block text-sm text-muted">{copy}</span>
              </p>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-28" id="services">
          <div className="shell">
            <div className="mb-12 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
              <div>
                <p className="kicker">What we handle</p>
                <h2 className="display text-4xl text-navy md:text-6xl">
                  Plumbing problems,
                  <span className="text-brand"> properly diagnosed.</span>
                </h2>
              </div>
              <div>
                <p className="text-muted">
                  From a slow drain to a failing sewer line, we start by finding the cause. You get a clear explanation
                  and a free estimate before deciding what happens next.
                </p>
                <Link to="/services" className="text-link mt-4">
                  Explore every service <ArrowUpRight className="size-4 text-brand" />
                </Link>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Link
                  key={service.slug}
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="group overflow-hidden rounded-lg bg-cream shadow-card transition-transform duration-200 ease-out hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy-mid">
                    <img
                      src={service.image}
                      alt={service.alt}
                      width={1400}
                      height={1050}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute right-3 bottom-3 font-display text-lg tracking-wide text-cream">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative p-5 pr-12">
                    <h3 className="font-sans text-lg font-semibold tracking-normal text-navy normal-case">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{service.short}</p>
                    <ArrowUpRight className="absolute top-5 right-4 size-4 text-brand" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy py-20 text-cream md:py-28">
          <div className="shell">
            <div className="mb-10 grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-end">
              <div>
                <p className="kicker kicker-light">In the field</p>
                <h2 className="display text-4xl md:text-6xl">See the work, not the sales pitch.</h2>
              </div>
              <p className="text-cream/65">Live job footage from camera inspections, hydro-jetting, drain cleaning, and after-hours calls.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link to="/services/$slug" params={{ slug: "camera-inspection" }} className="group relative isolate aspect-[16/10] overflow-hidden rounded-lg">
                <InViewVideo src={videos.camera.src} poster={videos.camera.poster} />
                <div className="absolute inset-0 bg-navy/35 transition-colors duration-200 group-hover:bg-navy/20" />
                <span className="absolute bottom-4 left-4 font-display text-2xl tracking-wide">Camera inspection</span>
              </Link>
              <Link to="/services/$slug" params={{ slug: "hydro-jetter" }} className="group relative isolate aspect-[16/10] overflow-hidden rounded-lg">
                <InViewVideo src={videos.hydro.src} poster={videos.hydro.poster} />
                <div className="absolute inset-0 bg-navy/35 transition-colors duration-200 group-hover:bg-navy/20" />
                <span className="absolute bottom-4 left-4 font-display text-2xl tracking-wide">Hydro-jetting</span>
              </Link>
              <Link to="/services/$slug" params={{ slug: "drain-cleaning-rooter-service" }} className="group relative isolate aspect-[16/10] overflow-hidden rounded-lg">
                <InViewVideo src={videos.drain.src} poster={videos.drain.poster} />
                <div className="absolute inset-0 bg-navy/35 transition-colors duration-200 group-hover:bg-navy/20" />
                <span className="absolute bottom-4 left-4 font-display text-2xl tracking-wide">Drain & rooter</span>
              </Link>
              <Link to="/contact" className="group relative isolate aspect-[16/10] overflow-hidden rounded-lg">
                <InViewVideo src={videos.emergency.src} poster={videos.emergency.poster} />
                <div className="absolute inset-0 bg-navy/35 transition-colors duration-200 group-hover:bg-navy/20" />
                <span className="absolute bottom-4 left-4 font-display text-2xl tracking-wide">24/7 emergency</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="kicker">No strings attached</p>
              <h2 className="display text-4xl text-navy md:text-6xl">
                Know what’s wrong.
                <br />
                Then decide.
              </h2>
              <p className="mt-5 max-w-md text-muted">
                Good service starts with a straight answer — not pressure. We inspect, explain, and quote before
                touching the repair.
              </p>
              <a href={PHONE_HREF} className={cn(buttonVariants({ variant: "primary" }), "mt-7")}>
                Call for help now
              </a>
            </div>
            <ol className="m-0 list-none p-0">
              {processSteps.map((step) => (
                <li key={step.n} className="grid grid-cols-[3rem_1fr] gap-5 border-t border-line py-6 last:border-b">
                  <span className="text-xs font-bold tracking-[0.14em] text-brand">{step.n}</span>
                  <div>
                    <h3 className="font-sans text-xl font-semibold tracking-normal text-navy normal-case">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-28">
          <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <img
                src="/media/camera-inspection.jpg"
                alt="Sewer camera inspection equipment showing a live view inside a pipe"
                width={1400}
                height={1050}
                loading="lazy"
                className="relative z-10 w-[92%] rounded-lg object-cover outline outline-1 -outline-offset-1 outline-ink/10"
              />
              <div className="absolute top-6 right-0 bottom-0 left-8 rounded-lg border-2 border-brand" aria-hidden="true" />
              <div className="absolute right-0 -bottom-4 z-20 flex items-center gap-3 rounded-md bg-brand px-5 py-4 text-cream">
                <strong className="font-display text-4xl leading-none">25+</strong>
                <span className="text-[0.7rem] font-bold tracking-[0.08em] uppercase">
                  Years serving
                  <br />
                  Los Angeles
                </span>
              </div>
            </div>
            <div>
              <p className="kicker">Built on hands-on experience</p>
              <h2 className="display text-4xl text-navy md:text-5xl">A local company with deep roots.</h2>
              <p className="mt-5 text-muted">
                Extreme Plumbing & Rooter began in 1997, when plumbing and construction work was an after-school job
                alongside family. That foundation grew into a company serving homes, businesses, and high-rises across
                greater Los Angeles.
              </p>
              <p className="mt-4 text-muted">
                The approach has not changed: arrive ready, diagnose carefully, keep the work area clean, and explain
                the options without pressure.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  "24/7 emergency availability",
                  "Licensed California contractor",
                  "Camera-guided diagnosis",
                  "Residential and commercial",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-semibold text-navy">
                    <Check className="size-4 text-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-6">
                <Link to="/about" className="text-link">
                  Read our story <ArrowUpRight className="size-4 text-brand" />
                </Link>
                <Link to="/our-workers" className="text-link">
                  Meet our team <ArrowUpRight className="size-4 text-brand" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="shell">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="kicker">The people who show up</p>
                <h2 className="display text-4xl text-navy md:text-5xl">The Extreme Plumbing crew.</h2>
              </div>
              <Link to="/our-workers" className="text-link">
                See the full team <ArrowUpRight className="size-4 text-brand" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {team.slice(0, 4).map((member) => (
                <figure key={member.src} className="overflow-hidden rounded-lg bg-navy-mid">
                  <img
                    src={member.src}
                    alt={member.alt}
                    width={270}
                    height={384}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover object-top"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand py-20 text-cream md:py-28">
          <div className="shell">
            <div className="mb-10 grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-end">
              <div>
                <p className="kicker kicker-light">Real customer experiences</p>
                <h2 className="display text-4xl md:text-5xl">Trusted when it matters.</h2>
              </div>
              <p className="text-cream/80">Customers mention fast diagnosis, clean work, and respectful service.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.slice(0, 3).map((item) => (
                <blockquote key={`${item.name}-${item.source}`} className="rounded-lg border border-cream/20 bg-navy/15 p-6">
                  <p className="text-xs tracking-[0.2em]" aria-label="5 out of 5 stars">
                    ★★★★★
                  </p>
                  <p className="mt-4 min-h-28 text-[0.98rem] leading-relaxed text-cream/90">“{item.quote}”</p>
                  <footer className="mt-6 text-sm font-semibold">
                    {item.name}
                    <span className="mt-0.5 block text-xs font-normal tracking-wide text-cream/60 uppercase">
                      {item.source}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <p className="text-cream/75">See more customer feedback</p>
              {socialLinks.slice(0, 2).map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  {item.shortLabel} reviews
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="kicker">Service area</p>
              <h2 className="display text-4xl text-navy md:text-5xl">All across Los Angeles.</h2>
              <p className="mt-4 max-w-md text-muted">
                We cover the greater Los Angeles area, the San Fernando Valley, and surrounding communities — 24 hours a
                day.
              </p>
              <Link to="/service-areas" className="text-link mt-5">
                See service-area details <ArrowUpRight className="size-4 text-brand" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <span
                  key={area}
                  className="rounded-md border border-line bg-cream px-3.5 py-2 text-sm font-semibold text-navy"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream py-20 md:py-28">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="kicker">Straight answers</p>
              <h2 className="display text-4xl text-navy md:text-5xl">Questions before you call?</h2>
              <p className="mt-4 text-muted">The details customers ask most often — estimates, emergencies, and what a camera inspection actually is.</p>
              <Link to="/faq" className="text-link mt-5">
                Read the full FAQ <ArrowUpRight className="size-4 text-brand" />
              </Link>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {faqs.slice(0, 4).map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                    {item.q}
                    <span className="grid size-8 shrink-0 place-items-center rounded-md border border-line text-brand group-open:bg-navy group-open:text-cream">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-prose pr-12 text-sm leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="shell">
            <div className="mb-12 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
              <div>
                <p className="kicker">Helpful before you call</p>
                <h2 className="display text-4xl text-navy md:text-5xl">
                  Practical plumbing
                  <span className="text-brand"> guides for LA homes.</span>
                </h2>
              </div>
              <div>
                <p className="text-muted">
                  Warning signs, what to do in an emergency, and when a camera inspection is the smart next step.
                </p>
                <Link to="/articles" className="text-link mt-4">
                  Browse all articles <ArrowUpRight className="size-4 text-brand" />
                </Link>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {articles.slice(0, 3).map((article) => (
                <article key={article.slug} className="overflow-hidden rounded-lg bg-cream shadow-card">
                  <Link to="/articles/$slug" params={{ slug: article.slug }} className="block aspect-[3/2] overflow-hidden">
                    <img
                      src={article.image}
                      alt=""
                      width={1400}
                      height={933}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </Link>
                  <div className="p-5">
                    <time className="text-xs font-semibold tracking-[0.12em] text-muted uppercase" dateTime={article.publishedAt}>
                      {formatArticleDate(article.publishedAt)}
                    </time>
                    <h2 className="mt-2 font-sans text-lg font-semibold tracking-normal text-navy normal-case">
                      <Link to="/articles/$slug" params={{ slug: article.slug }}>
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-muted">{article.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaBand kicker="Take the next step" title="Let us take a look." />
      </main>
    </SiteShell>
  );
}
