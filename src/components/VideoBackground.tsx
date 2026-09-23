"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function VideoBackground({
  src,
  poster,
  className,
  priority = false,
}: {
  src: string;
  poster: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-navy", className)} aria-hidden="true">
      <img
        src={poster}
        alt=""
        width={1280}
        height={720}
        className="hero-poster absolute inset-0 size-full object-cover"
        fetchPriority={priority ? "high" : "low"}
      />
      <video
        className="hero-video absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export function InViewVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void node.play().catch(() => undefined);
        } else {
          node.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-navy", className)} aria-hidden="true">
      <img src={poster} alt="" width={1280} height={720} className="absolute inset-0 size-full object-cover" />
      <video
        ref={ref}
        className="hero-video absolute inset-0 size-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
