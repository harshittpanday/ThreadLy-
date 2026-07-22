"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-950
        p-6
        shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}