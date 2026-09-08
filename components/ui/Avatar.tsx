import Image from "next/image";
import { cn } from "@/lib/utils";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarStatus = "online" | "offline" | "busy";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: AvatarSize;
  fallback?: string;
  status?: AvatarStatus;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
};

const statusStyles: Record<AvatarStatus, string> = {
  online: "bg-cyan-400",
  offline: "bg-mist-500",
  busy: "bg-rose-400",
};

export function Avatar({ src, alt, size = "md", fallback, status, className }: AvatarProps) {
  return (
    <span className={cn("relative inline-flex shrink-0", sizeStyles[size], className)}>
      <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-violet-500/30 to-cyan-400/30 font-medium text-white">
        {src ? (
          <Image src={src} alt={alt} fill sizes="56px" className="object-cover" />
        ) : (
          <span>{fallback ?? alt.slice(0, 2).toUpperCase()}</span>
        )}
      </span>
      {status && (
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-ink-900",
            statusStyles[status]
          )}
        />
      )}
    </span>
  );
}
