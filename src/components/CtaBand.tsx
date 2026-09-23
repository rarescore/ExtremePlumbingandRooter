import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CtaBand({
  kicker = "Free inspection",
  title = "Tell us what’s going on.",
}: {
  kicker?: string;
  title?: string;
}) {
  return (
    <section className="bg-navy py-16 text-cream md:py-20">
      <div className="shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="kicker kicker-light">{kicker}</p>
          <h2 className="display text-4xl md:text-5xl">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={PHONE_HREF} className={cn(buttonVariants({ variant: "invert", size: "lg" }))}>
            Call {PHONE_DISPLAY}
          </a>
          <Link to="/contact" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            Send a message
          </Link>
        </div>
      </div>
    </section>
  );
}
