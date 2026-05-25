import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label="TrailKit home">
      <Image src="/brand/trailkit-mark.svg" alt="" width={34} height={34} priority />
      <span className="text-lg font-semibold text-white">
        Trail<span className="text-primary">Kit</span>
      </span>
    </Link>
  );
}
