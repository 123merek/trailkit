import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label="TrailKit home">
      <Image src="/brand/trailkit-mark.svg" alt="" width={34} height={34} priority />
      <span className={cn("text-lg font-semibold", variant === "dark" ? "text-[#372a54]" : "text-white")}>
        Trail<span className="text-primary">Kit</span>
      </span>
    </Link>
  );
}
