export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  ISBN: string;
  createdAt: number;
  editedAt: number | string;
  isActive: boolean;
}
