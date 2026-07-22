"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth } from "@/app/firebase/config";

export async function signup(
  username: string,
  email: string,
  password: string
) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(credential.user, {
    displayName: username,
  });

  return credential.user;
}

export async function login(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return credential.user;
}

export async function logout() {
  await signOut(auth);

  document.cookie =
    "threadly-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
}

export function listenAuth(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      document.cookie =
        "threadly-auth=true; path=/; max-age=2592000;";
    } else {
      document.cookie =
        "threadly-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }

    callback(user);
  });
}