import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

export function SiteShell({
  children,
  overlayHeader = false,
}: {
  children: ReactNode;
  overlayHeader?: boolean;
}) {
  return (
    <div className="min-h-svh bg-paper pb-20 md:pb-0">
      <SiteHeader overlay={overlayHeader} />
      {children}
      <SiteFooter />
      <a
        href={PHONE_HREF}
        className="fixed right-3 bottom-3 z-30 rounded-md bg-brand px-5 py-3.5 text-center text-[0.78rem] font-bold tracking-[0.08em] text-cream uppercase shadow-card md:hidden"
      >
        Call now · {PHONE_DISPLAY}
      </a>
    </div>
  );
}
