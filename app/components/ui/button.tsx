"use client";

import { ButtonHTMLAttributes } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({
  children,
  loading,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`
      flex
      h-12
      w-full
      items-center
      justify-center
      gap-2
      rounded-xl
      bg-white
      font-semibold
      text-black
      transition-all
      hover:opacity-90
      active:scale-95
      disabled:opacity-50
      ${className}
      `}
      {...props}
    >
      {loading && <Spinner />}

      {!loading && children}
    </button>
  );
}