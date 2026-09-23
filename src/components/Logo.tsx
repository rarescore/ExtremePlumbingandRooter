import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({
  compact = false,
}: {
  variant?: "light" | "dark";
  compact?: boolean;
}) {
  return (
    <Link
      to="/"
      aria-label="Extreme Plumbing and Rooter home"
      className={cn("logo-lockup", compact && "is-compact")}
    >
      <img
        src="/media/logo-on-dark.png"
        alt="Extreme Plumbing & Rooter Inc. — Licensed and Bonded"
        width={800}
        height={301}
        className="logo-img"
      />
    </Link>
  );
}
