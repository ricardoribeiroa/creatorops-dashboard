import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "section";
};

export function Card({ as: Component = "div", className = "", ...props }: CardProps) {
  return (
    <Component
      className={`rounded-xl border border-border bg-surface p-5 shadow-sm ${className}`}
      {...props}
    />
  );
}
