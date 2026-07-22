export interface ThreadlyUser {
  uid: string;
  username: string;
  email: string;
  photoURL: string;
  bio: string;
  createdAt: number;

  followers: number;
  following: number;

  verified: boolean;
}