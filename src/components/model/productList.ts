import { Product } from "./types";

export default class ProductList {
  products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }

  getMinPrice() {
    let minValue = this.products[0].price;
    this.products.forEach((elem) => {
      if (elem.price < minValue) {
        minValue = elem.price;
      }
    });
    return minValue;
  }

  getMaxPrice() {
    let maxValue = this.products[0].price;
    this.products.forEach((elem) => {
      if (elem.price > maxValue) {
        maxValue = elem.price;
      }
    });
    return maxValue;
  }

  getMinStock() {
    let minStock = this.products[0].stock;
    this.products.forEach((elem) => {
      if (elem.stock < minStock) {
        minStock = elem.stock;
      }
    });
    return minStock;
  }

  getMaxStock() {
    let maxStock = this.products[0].stock;
    this.products.forEach((elem) => {
      if (elem.price > maxStock) {
        maxStock = elem.stock;
      }
    });
    return maxStock;
  }

  getProductById(productId: number) {
    return this.products.find((elem) => elem.id === productId);
  }

  getAllCategories(): string[] {
    return this.getPropertyValues<string>("category");
  }

  getAllBrands(): string[] {
    return this.getPropertyValues<string>("brand");
  }

  getPropertyValues<T>(propertyName: string): Array<T> {
    const array: Array<T> = <Array<T>>this.products
      .map((elem: Product) => {
        if (elem[propertyName]) return <T>elem[propertyName];
        return undefined;
      })
      .filter((elem) => elem !== undefined);

    return Array.from(new Set(array));
  }

  getSortedProducts(propertyName: string, isAscending: boolean): Product[] {
    return this.products.sort((product1, product2) => {
      if (!product1[propertyName] || !product2[propertyName]) return 0;
      if (typeof product1[propertyName] !== "number") return 0;

      return isAscending
        ? <number>product1[propertyName] - <number>product2[propertyName]
        : <number>product2[propertyName] - <number>product1[propertyName];
    });
  }

  filterProducts(
    categoryList: string[],
    brandList: string[],
    searchInputValue: string,
    minPrice: number,
    maxPrice: number,
    minStock: number,
    maxStock: number
  ): Product[] {
    return this.products.filter((elem) => {
      if (categoryList.length > 0 && !categoryList.includes(elem.category))
        return false;
      if (brandList.length > 0 && !brandList.includes(elem.brand)) return false;
      if (
        searchInputValue.length > 0 &&
        !elem.brand
          .toLocaleLowerCase()
          .includes(searchInputValue.toLocaleLowerCase()) &&
        !elem.category
          .toLocaleLowerCase()
          .includes(searchInputValue.toLocaleLowerCase()) &&
        !elem.title
          .toLocaleLowerCase()
          .includes(searchInputValue.toLocaleLowerCase()) &&
        !elem.description
          .toLocaleLowerCase()
          .includes(searchInputValue.toLocaleLowerCase())
      )
        return false;
      if (elem.price < minPrice || elem.price > maxPrice) return false;
      if (elem.stock < minStock || elem.stock > maxStock) return false;
      return true;
    });
  }
}
