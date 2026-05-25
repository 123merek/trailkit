import { cn } from "@/lib/utils";

export function GradientGridBackground({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("gradient-grid min-h-screen", className)}>{children}</div>;
}
