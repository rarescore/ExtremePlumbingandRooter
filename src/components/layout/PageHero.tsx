import { VideoBackground } from "@/components/VideoBackground";
import { videos } from "@/lib/videos";

export function PageHero({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-cream">
      <VideoBackground src={videos.inner.src} poster={videos.inner.poster} />
      <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />
      <div className="shell relative py-16 md:py-24">
        <p className="kicker kicker-light">{kicker}</p>
        <h1 className="display max-w-4xl text-4xl md:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">{intro}</p>
      </div>
    </section>
  );
}
