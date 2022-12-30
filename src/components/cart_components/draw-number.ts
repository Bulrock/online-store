import { Product } from "../model/types";

export function drawNumber(page: number, arr: Array<Product[]>, index: number) {
  if (page < 1) page = 1;
  return (page - 1) * arr[0].length + index + 1;
}
