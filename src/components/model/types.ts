export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  countBuyProduct: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];

  [key: string]: string | number | string[];
};

export type Storage = {
  id: number;
  countBuyProduct: number;
};
