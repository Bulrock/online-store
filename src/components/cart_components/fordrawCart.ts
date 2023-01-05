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
