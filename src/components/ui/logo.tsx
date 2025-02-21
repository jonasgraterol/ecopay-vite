import { cn } from "@/lib/utils"
import logoImage from "@/assets/von-logo-original.jpeg"

interface LogoProps {
  size?: "xxs" | "xs" | "sm" | "md" | "lg"
  className?: string
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    xxs: "h-8 w-8",
    xs: "h-12 w-12",
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32"
  }

  return (
    <div className={cn("rounded-full bg-emerald-500/10 p-1.5", className)}>
      <img 
        src={logoImage} 
        alt="Von-Exchange Logo" 
        className={cn("object-contain", sizeClasses[size])}
        
      />
    </div>
  )
}
