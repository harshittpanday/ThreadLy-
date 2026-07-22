"use client";

import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`
        w-full
        h-12
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900
        px-4
        text-white
        outline-none
        transition
        placeholder:text-zinc-500
        focus:border-white
        ${className}
      `}
      {...props}
    />
  );
}