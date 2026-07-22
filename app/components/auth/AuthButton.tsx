"use client";

import { Button } from "@/app/components/ui/button";

interface AuthButtonProps {
  loading?: boolean;
  text: string;
  loadingText?: string;
}

export default function AuthButton({
  loading = false,
  text,
  loadingText = "Loading...",
}: AuthButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="h-12 w-full rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
    >
      {loading ? loadingText : text}
    </Button>
  );
}