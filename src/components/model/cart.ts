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
    const savedProducts = localStorage.getItem("countBuyProduct");
    let totalPrice = 0;
    let totalPriceN = 0;
    if (savedProducts) {
      this.cartProducts.forEach((value, key) => {
        const priceOfCurrentId = this.products.getProductById(key)?.price || 0;
        totalPriceN = priceOfCurrentId * value;
        totalPrice += totalPriceN;
      });
    }
    return totalPrice;
  }

  getProductsCount(): number {
    const savedProducts = localStorage.getItem("countBuyProduct");
    let totalProductsCount = 0;
    if (savedProducts) {
      this.cartProducts.forEach((value) => (totalProductsCount += value));
    }
    return totalProductsCount;
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
