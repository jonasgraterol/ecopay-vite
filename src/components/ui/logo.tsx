import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "xxs" | "xs" | "sm" | "md" | "lg"
  className?: string
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    xxs: "text-md p-1",
    xs: "text-xl p-1",
    sm: "text-2xl p-2",
    md: "text-3xl p-3",
    lg: "text-4xl p-4"
  }

  return (
    <div className={cn("rounded-full bg-emerald-500/10", sizeClasses[size], className)}>
      <h1 className="text-emerald-400 font-bold">$V</h1>
    </div>
  )
}
