import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";

import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "@/app/firebase/config";

export async function signUp(
  displayName: string,
  username: string,
  email: string,
  password: string,
): Promise<User> {
  const credential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

await updateProfile(credential.user, {
  displayName,
});

  await setDoc(doc(db, "users", credential.user.uid), {
    uid: credential.user.uid,
    username,
    displayName: username,
    email,

    bio: "",
    avatar: "",
    banner: "",
    website: "",

    verified: false,

    followersCount: 0,
    followingCount: 0,
    postsCount: 0,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return credential.user;
}

export async function signIn(
  email: string,
  password: string
): Promise<User> {
  const credential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return credential.user;
}

export async function logout() {
  await signOut(auth);
}