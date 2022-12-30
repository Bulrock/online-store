import { Product } from "../model/types";

export function drawNumber(
  page: number,
  arr: Array<Product[]>,
  index: number
): number {
  if (page < 1) page = 1;
  return (page - 1) * arr[0].length + index + 1;
}

export function calculateDiscount(
  cartTotal: number,
  discountCartTotal: number
): number {
  return Number((cartTotal * ((100 - discountCartTotal) / 100)).toFixed(2));
}

export function lengthWordsInput(arr: string[], a: number) {
  return arr.every((item) => item.length >= a);
}

export function isIdProduct(arr: Product[], id: number) {
  return arr.find((item) => item.id === id);
}

export function converteString(str: string) {
  return str
    .trim()
    .split(" ")
    .filter((item) => item !== "");
}
