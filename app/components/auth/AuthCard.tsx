"use client";

import { ReactNode } from "react";
import { Card } from "@/app/components/ui/Card";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthCard({
  title,
  subtitle,
  children,
}: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <Card className="w-full max-w-md rounded-3xl">
        <h1 className="text-4xl font-bold">{title}</h1>

        <p className="mt-2 mb-8 text-zinc-400">
          {subtitle}
        </p>

        {children}
      </Card>
    </main>
  );
}