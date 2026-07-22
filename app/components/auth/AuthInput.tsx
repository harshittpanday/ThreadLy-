"use client";

import * as React from "react";
import { cn } from "@/app/lib/utils";
import Input from "@/app/components/ui/input";

interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AuthInput({
  label,
  className,
  ...props
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-300">
        {label}
      </label>

      <Input
        className={cn(
          "h-12 rounded-xl border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-white",
          className
        )}
        {...props}
      />
    </div>
  );
}