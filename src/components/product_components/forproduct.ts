import { Product } from "../model/types";

export function isIdProduct(arr: Product[], id: number) {
  return arr.find((item) => item.id === id);
}
