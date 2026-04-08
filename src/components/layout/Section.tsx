import { useRef } from "react";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

export function Section({
  id,
  children,
  className = "",
  interactive = false,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative h-screen flex items-center justify-center ${
        interactive ? "pointer-events-auto" : "pointer-events-none"
      } ${className}`}
    >
      {children}
    </section>
  );
}
