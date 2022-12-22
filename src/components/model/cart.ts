import ProductList from "./productList";

export default class Cart {
  productIds: Set<number> = new Set();
  products: ProductList;

  constructor(products: ProductList) {
    this.products = products;
  }

  add(productId: number) {
    this.productIds.add(productId);
    this.saveToLocalStorage();
  }

  delete(productId: number) {
    this.productIds.delete(productId);
    this.saveToLocalStorage();
  }

  clear() {
    this.productIds.forEach((elem) => this.productIds.delete(elem));
    this.removeFromLocalStorage();
  }

  getProductsTotalPrice(): number {
    let totalPrice = 0;
    this.productIds.forEach((elem) => {
      totalPrice += this.products.getProductById(elem)?.price || 0;
    });
    return totalPrice;
  }

  getProductsCount(): number {
    return this.productIds.size;
  }

  saveToLocalStorage() {
    localStorage.setItem(
      "cartProductIds",
      JSON.stringify([...this.productIds])
    );
    console.log(localStorage.getItem("cartProductIds"));
  }

  removeFromLocalStorage() {
    localStorage.removeItem("cartProductIds");
  }
}
