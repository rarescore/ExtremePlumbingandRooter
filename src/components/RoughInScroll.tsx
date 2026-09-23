"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

const frames = Array.from({ length: 20 }, (_, i) => `/media/sewer/f${String(i + 1).padStart(2, "0")}.jpg`);

function cover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = w / h;
  let dw: number;
  let dh: number;
  let dx: number;
  let dy: number;
  if (ir > cr) {
    dh = h;
    dw = h * ir;
    dx = (w - dw) / 2;
    dy = 0;
  } else {
    dw = w;
    dh = w / ir;
    dx = 0;
    dy = (h - dh) * 0.35;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

export function HomeHero() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<HTMLAnchorElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    images.current = frames.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      return img;
    });
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const paint = (progress: number) => {
      const canvas = canvasRef.current;
      const img = images.current[Math.min(frames.length - 1, Math.round(progress * (frames.length - 1)))];
      if (canvas && img?.complete && img.naturalWidth) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w && h) {
          const nextW = Math.round(w * dpr);
          const nextH = Math.round(h * dpr);
          if (canvas.width !== nextW || canvas.height !== nextH) {
            canvas.width = nextW;
            canvas.height = nextH;
          }
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            cover(ctx, img, w, h);
          }
        }
      }
      const reveal = reduce ? 1 : Math.min(1, Math.max(0, (progress - 0.84) / 0.16));
      if (copyRef.current) {
        copyRef.current.style.opacity = String(reveal);
        copyRef.current.style.pointerEvents = reveal > 0.55 ? "auto" : "none";
      }
      if (callRef.current) {
        const show = reduce ? 0 : progress < 0.8 ? 1 : 0;
        callRef.current.style.opacity = String(show);
        callRef.current.style.pointerEvents = show ? "auto" : "none";
      }
    };

    if (reduce) {
      paint(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const node = trackRef.current;
      if (!node) return;
      const scrollable = node.offsetHeight - window.innerHeight;
      const traveled = Math.min(Math.max(-node.getBoundingClientRect().top, 0), Math.max(scrollable, 1));
      paint(scrollable > 0 ? traveled / scrollable : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    const first = images.current[0];
    if (first && !first.complete) first.addEventListener("load", update, { once: true });
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <section
      ref={reduce ? undefined : trackRef}
      className={reduce ? "relative isolate h-svh bg-[#6d8a52]" : "relative h-[180vh] bg-[#6d8a52]"}
      aria-label="Front yard opened, sewer line replaced, and the trench closed"
    >
      <div className={reduce ? "relative h-svh overflow-hidden" : "sticky top-0 h-svh overflow-hidden"}>
        <img
          src={frames[0]}
          alt="A house before the front yard is opened for a sewer line"
          width={900}
          height={506}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
        <canvas ref={canvasRef} className="absolute inset-0 size-full" />
        <div ref={copyRef} className="absolute inset-0 z-10 flex items-end" style={{ opacity: 0, pointerEvents: "none" }}>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 48%, color-mix(in srgb, #071525 78%, transparent) 100%)" }}
            aria-hidden="true"
          />
          <div className="shell relative z-10 pb-24 md:pb-14">
            <h1 className="display max-w-3xl text-4xl text-cream sm:text-5xl lg:text-6xl">
              Professional plumbing services in Los Angeles
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/85 md:text-base">
              Rough-in through repair, 24/7. We inspect first and give a free estimate before any work begins.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/contact" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
                Get a free estimate
              </Link>
              <a href={PHONE_HREF} className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "hidden md:inline-flex")}>
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
        <a
          ref={callRef}
          href={PHONE_HREF}
          className="absolute bottom-8 left-1/2 z-20 hidden min-h-12 -translate-x-1/2 items-center rounded-md bg-brand px-6 text-sm font-bold tracking-wide text-cream md:inline-flex"
        >
          Call us · {PHONE_DISPLAY}
        </a>
      </div>
    </section>
  );
}
