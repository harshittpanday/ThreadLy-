import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/app/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "ThreadLy",
  description: "Share ideas, connect with people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}