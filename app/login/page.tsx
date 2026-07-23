"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Loader2 } from "lucide-react";

import { loginUser } from "@/app/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  async function handleLogin(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await loginUser(email, password);

      router.push("/");
    } catch (error) {
      console.error(error);

      alert("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8">

        <h1 className="text-4xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-2 mb-8 text-zinc-400">
          Login to ThreadLy
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-white outline-none focus:border-white"
            />
          </div>

          <div className="relative">
            <label className="mb-2 block text-sm text-zinc-300">
              Password
            </label>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 pr-12 text-white outline-none focus:border-white"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-[42px] text-zinc-400"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <button
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-white font-semibold text-black hover:opacity-90"
          >
            {loading ? (
              <Loader2
                className="animate-spin"
              />
            ) : (
              "Login"
            )}
          </button>

          <Link
            href="/forgot-password"
            className="block text-center text-sm text-zinc-400 hover:text-white"
          >
            Forgot Password?
          </Link>

          <p className="text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-white hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}