export type IBook = {
  id: number;
  title: string;
  author: string;
  quality: string;
  stockNumber?: string;
  pages: number;
  genre: string;
  price: number;
  summary: string;
  published: string;
  isAvailable?: boolean;
  cover: string;
};
