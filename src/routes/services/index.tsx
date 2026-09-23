import { Link, createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/CtaBand";
import { InViewVideo } from "@/components/VideoBackground";
import { PageHero } from "@/components/layout/PageHero";
import { SiteShell } from "@/components/layout/SiteShell";
import { buttonVariants } from "@/components/ui/button";
import { canonical, services } from "@/lib/site";
import { videoForService } from "@/lib/videos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Los Angeles Plumbing Services | Extreme Plumbing & Rooter" },
      {
        name: "description",
        content:
          "Drain cleaning, camera inspection, leak detection, water heaters, sewer replacement, copper repipe, hydro-jetting, boiler and high-rise plumbing across Los Angeles.",
      },
    ],
    links: [{ rel: "canonical", href: canonical("/services") }],
  }),
});

function ServicesPage() {
  return (
    <SiteShell>
      <main id="main">
        <PageHero
          kicker="Residential · Commercial · 24/7"
          title="Plumbing services built around the right diagnosis."
          intro="Tell us what is happening. We’ll inspect it, explain the options, and provide a free estimate before any work begins."
        />
        <section className="py-16 md:py-24">
          <div className="shell grid gap-16">
            {services.map((service, index) => {
              const clip = videoForService(service.slug);
              return (
                <article key={service.slug} id={service.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className={cn("relative aspect-[4/3] overflow-hidden rounded-lg", index % 2 === 1 && "lg:order-2")}>
                    <InViewVideo src={clip.src} poster={service.image} />
                  </div>
                  <div>
                    <p className="kicker">0{index + 1} · Extreme Plumbing</p>
                    <h2 className="display text-4xl text-navy md:text-5xl">{service.title}</h2>
                    <p className="mt-4 text-muted">{service.description}</p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {service.highlights.map((item) => (
                        <li key={item} className="relative pl-4 text-sm font-semibold text-navy before:absolute before:top-1.5 before:left-0 before:size-1.5 before:bg-brand">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <Link
                        to="/services/$slug"
                        params={{ slug: service.slug }}
                        className={cn(buttonVariants({ variant: "navy" }))}
                      >
                        Service details
                      </Link>
                      <Link to="/contact" className="text-link">
                        Free estimate
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <CtaBand kicker="Not sure which service you need?" title="That’s what the inspection is for." />
      </main>
    </SiteShell>
  );
}
