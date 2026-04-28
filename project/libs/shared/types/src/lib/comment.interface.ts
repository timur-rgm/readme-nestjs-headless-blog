export interface Comment {
  id?: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  postId: string;
  userId: string;
}
