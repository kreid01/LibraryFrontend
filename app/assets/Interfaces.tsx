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
  isBorrowing?: boolean;
  currentOwnerId: number;
};

export type IOrder = {
  id: number;
  userId: number;
  isBorrowing: boolean;
  bookIds: number[];
  created: string;
  addressId: string;
  cartTotal?: number;
};
