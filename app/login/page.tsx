"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthInput from "@/app/components/auth/AuthInput";
import AuthButton from "@/app/components/auth/AuthButton";
import { AuthCard } from "@/app/components/auth/AuthCard";

import { signIn } from "@/app/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await signIn(email, password);

      router.push("/");
    } catch {
      alert("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to ThreadLy."
    >
      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >
        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <AuthButton
          loading={loading}
          text="Login"
          loadingText="Signing In..."
        />

        <div className="text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-white hover:underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}