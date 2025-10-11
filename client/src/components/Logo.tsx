import { Download } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl"
  };

  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <div className="relative bg-gradient-to-br from-primary to-primary/80 p-2 rounded-xl">
          <Download className={`${iconSizes[size]} text-primary-foreground`} />
        </div>
      </div>
      {showText && (
        <span className={`${sizeClasses[size]} font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent`}>
          Social Downloader
        </span>
      )}
    </div>
  );
}
