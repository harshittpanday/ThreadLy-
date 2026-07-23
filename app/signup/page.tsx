"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Loader2 } from "lucide-react";

import { registerUser } from "@/app/services/auth.service";

export default function SignupPage() {
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (
      !displayName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        displayName,
        username,
        email,
        password,
      });

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Failed to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
        <h1 className="text-4xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 mb-8 text-zinc-400">
          Join ThreadLy today.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Display Name
            </label>

            <input
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-white outline-none focus:border-white"
              value={displayName}
              onChange={(e) =>
                setDisplayName(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Username
            </label>

            <input
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-white outline-none focus:border-white"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                    .replace(/\s/g, "")
                    .toLowerCase()
                )
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Email
            </label>

            <input
              type="email"
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-white outline-none focus:border-white"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="relative">
            <label className="mb-2 block text-sm text-zinc-300">
              Password
            </label>

            <input
              type={
                showPassword ? "text" : "password"
              }
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 pr-12 text-white outline-none focus:border-white"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
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

          <div className="relative">
            <label className="mb-2 block text-sm text-zinc-300">
              Confirm Password
            </label>

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 pr-12 text-white outline-none focus:border-white"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-[42px] text-zinc-400"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <button
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-white font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <Loader2
                size={20}
                className="animate-spin"
              />
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-white hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}