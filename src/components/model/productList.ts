import { Product } from "./types";

export default class ProductList {
  products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }

  getMinPrice() {
    if (this.products.length === 0) return undefined;
    let minValue = this.products[0].price;
    this.products.forEach((elem) => {
      if (elem.price < minValue) {
        minValue = elem.price;
      }
    });
    return minValue;
  }

  getMaxPrice() {
    if (this.products.length === 0) return undefined;
    let maxValue = this.products[0].price;
    this.products.forEach((elem) => {
      if (elem.price > maxValue) {
        maxValue = elem.price;
      }
    });
    return maxValue;
  }

  getMinStock() {
    if (this.products.length === 0) return undefined;
    let minStock = this.products[0].stock;
    this.products.forEach((elem) => {
      if (elem.stock < minStock) {
        minStock = elem.stock;
      }
    });
    return minStock;
  }

  getMaxStock() {
    if (this.products.length === 0) return undefined;
    let maxStock = this.products[0].stock;
    this.products.forEach((elem) => {
      if (elem.stock > maxStock) {
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

  getNumberOfProductsByCategory(productCategory: string) {
    return this.products.filter((product) => {
      if (product.category === productCategory) return true;
      return false;
    }).length;
  }

  getNumberOfProductsByBrand(productBrand: string) {
    return this.products.filter((product) => {
      if (product.brand === productBrand) return true;
      return false;
    }).length;
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
    minPrice: number | undefined,
    maxPrice: number | undefined,
    minStock: number | undefined,
    maxStock: number | undefined,
    sortOption: string,
    sortOptionValue: string
  ): ProductList {
    const filteredProducts = this.products.filter((elem) => {
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
      if (
        minPrice !== undefined &&
        maxPrice !== undefined &&
        (elem.price < minPrice || elem.price > maxPrice)
      )
        return false;
      if (
        minStock !== undefined &&
        maxStock !== undefined &&
        (elem.stock < minStock || elem.stock > maxStock)
      )
        return false;
      return true;
    });

    function sortByPrice(value: string) {
      if (value === "ASC") {
        return filteredProducts.sort((a, b) => a.price - b.price);
      }
      if (value === "DESC") {
        return filteredProducts.sort((a, b) => b.price - a.price);
      }
    }

    if (sortOption === "price" && sortOptionValue === "ASC") {
      sortByPrice("ASC");
    }
    if (sortOption === "price" && sortOptionValue === "DESC") {
      sortByPrice("DESC");
    }

    function sortByRating(value: string) {
      if (value === "ASC") {
        return filteredProducts.sort((a, b) => a.rating - b.rating);
      }
      if (value === "DESC") {
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      }
    }

    if (sortOption === "rating" && sortOptionValue === "ASC") {
      sortByRating("ASC");
    }
    if (sortOption === "rating" && sortOptionValue === "DESC") {
      sortByRating("DESC");
    }

    function sortByDiscount(value: string) {
      if (value === "ASC") {
        return filteredProducts.sort(
          (a, b) => a.discountPercentage - b.discountPercentage
        );
      }
      if (value === "DESC") {
        return filteredProducts.sort(
          (a, b) => b.discountPercentage - a.discountPercentage
        );
      }
    }

    if (sortOption === "discount" && sortOptionValue === "ASC") {
      sortByDiscount("ASC");
    }
    if (sortOption === "discount" && sortOptionValue === "DESC") {
      sortByDiscount("DESC");
    }
    return new ProductList(filteredProducts);
  }
}
