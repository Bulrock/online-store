import ProductList from "../../../src/components/model/productList";
import { data } from "../../../tests/data/data";

describe("ProductList getMinPrice method:", () => {
  test("should return undefined on products absence", () => {
    const products: never[] = [];
    const productList = new ProductList(products);

    expect(productList.getMinPrice()).toBe(undefined);
  });

  test("should return min price from all products", () => {
    const productList = new ProductList(data);

    expect(productList.getMinPrice()).toBe(50);
  });
});

describe("ProductList getMaxPrice method:", () => {
  test("should return undefined on products absence", () => {
    const products: never[] = [];
    const productList = new ProductList(products);

    expect(productList.getMaxPrice()).toBe(undefined);
  });

  test("should return max price from all products", () => {
    const productList = new ProductList(data);

    expect(productList.getMaxPrice()).toBe(1749);
  });
});

describe("ProductList getMinStock method:", () => {
  test("should return undefined on products absence", () => {
    const products: never[] = [];
    const productList = new ProductList(products);

    expect(productList.getMinStock()).toBe(undefined);
  });

  test("should return min stock value from all products", () => {
    const productList = new ProductList(data);

    expect(productList.getMinStock()).toBe(32);
  });
});

describe("ProductList getMaxStock method:", () => {
  test("should return undefined on products absence", () => {
    const products: never[] = [];
    const productList = new ProductList(products);

    expect(productList.getMaxStock()).toBe(undefined);
  });

  test("should return max stock value from all products", () => {
    const productList = new ProductList(data);

    expect(productList.getMaxStock()).toBe(123);
  });
});

describe("ProductList getProductById method:", () => {
  test("should return first product from product list", () => {
    const productId = 1;
    const productList = new ProductList(data);

    expect(productList.getProductById(productId)).toBe(productList.products[0]);
  });

  test("should return last product from product list", () => {
    const productId = 82;
    const productList = new ProductList(data);

    expect(productList.getProductById(productId)).toBe(
      productList.products[11]
    );
  });
});

describe("ProductList getPropertyValues method:", () => {
  test("should return array", () => {
    const property = "brand";
    const productList = new ProductList(data);

    expect(productList.getPropertyValues(property)).toBeInstanceOf(Array);
  });

  test("should return empty array on absence of property", () => {
    const property = "absent";
    const productList = new ProductList(data);

    expect(productList.getPropertyValues(property)).toStrictEqual([]);
  });
});

describe("ProductList getAllCategories method:", () => {
  test("should return array of correct categories", () => {
    const productList = new ProductList(data);
    const arrayOfCategories: string[] = [
      "smartphones",
      "laptops",
      "furniture",
      "sunglasses",
    ];

    expect(productList.getAllCategories()).toStrictEqual(arrayOfCategories);
  });
});

describe("ProductList getAllBrands method:", () => {
  test("should return array of correct brands", () => {
    const productList = new ProductList(data);
    const arrayOfBrands: string[] = [
      "Apple",
      "Samsung",
      "OPPO",
      "Huawei",
      "APPle",
      "Microsoft Surface",
      "Infinix",
      "HP Pavilion",
      "Kitchen Shelf",
      "Designer Sun Glasses",
    ];

    expect(productList.getAllBrands()).toEqual(arrayOfBrands);
  });
});
