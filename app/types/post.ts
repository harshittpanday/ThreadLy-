export interface ThreadlyPost {
  id: string;

  uid: string;

  username: string;

  userImage: string;

  content: string;

  image?: string;

  likes: number;

  comments: number;

  createdAt: number;
}