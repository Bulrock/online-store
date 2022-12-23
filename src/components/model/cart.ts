import ProductList from "./productList";
import { CartProduct } from "./types";

export default class Cart {
  cartProducts: Map<number, number> = new Map();
  products: ProductList;

  constructor(products: ProductList) {
    this.products = products;
    this.loadFromLocalStorage();
  }

  add(productId: number) {
    this.cartProducts.set(productId, 1);
    this.saveToLocalStorage();
  }

  delete(productId: number) {
    this.cartProducts.delete(productId);
    this.saveToLocalStorage();
  }

  clear() {
    this.cartProducts.forEach((value, key) => this.cartProducts.delete(key));
    this.removeFromLocalStorage();
  }

  getProductsTotalPrice(): number {
    let totalPrice = 0;
    this.cartProducts.forEach((value, key) => {
      totalPrice += this.products.getProductById(key)?.price || 0;
    });
    return totalPrice;
  }

  getProductsCount(): number {
    return this.cartProducts.size;
  }

  saveToLocalStorage() {
    const cartProductsObject: CartProduct[] = [];
    this.cartProducts.forEach((value, key) =>
      cartProductsObject.push({ id: key, count: value })
    );
    localStorage.setItem("countBuyProduct", JSON.stringify(cartProductsObject));
    console.log(localStorage.getItem("countBuyProduct"));
  }

  loadFromLocalStorage() {
    const savedProducts = localStorage.getItem("countBuyProduct");

    if (savedProducts) {
      const cartProductArray = JSON.parse(savedProducts);
      cartProductArray.forEach((elem: CartProduct) =>
        this.cartProducts.set(elem.id, elem.count)
      );
    }
    console.log(localStorage.getItem("countBuyProduct"));
  }

  removeFromLocalStorage() {
    localStorage.removeItem("countBuyProduct");
  }
}
