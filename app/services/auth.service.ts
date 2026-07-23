import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";

import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "@/app/firebase/config";

export interface RegisterUserData {
  displayName: string;
  username: string;
  email: string;
  password: string;
}

export async function registerUser({
  displayName,
  username,
  email,
  password,
}: RegisterUserData): Promise<User> {
  const normalizedUsername =
    username.toLowerCase();

  const usernameQuery = query(
    collection(db, "users"),
    where(
      "username",
      "==",
      normalizedUsername
    )
  );

  const usernameSnapshot =
    await getDocs(usernameQuery);

  if (!usernameSnapshot.empty) {
    throw new Error(
      "Username already taken."
    );
  }

  const credential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await updateProfile(credential.user, {
    displayName,
  });

  await setDoc(
    doc(db, "users", credential.user.uid),
    {
      uid: credential.user.uid,

      displayName,

      username: normalizedUsername,

      email,

      bio: "",

      avatar: "",

      banner: "",

      website: "",

      location: "",

      verified: false,

      followersCount: 0,
      followingCount: 0,
      postsCount: 0,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );

  return credential.user;
}

export async function loginUser(
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

export async function resetPassword(
  email: string
) {
  await sendPasswordResetEmail(auth, email);
}

export async function logoutUser() {
  await signOut(auth);
}