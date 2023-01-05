import { data } from "../../../src/components/data";
import { isIdProduct } from "../../../src/components/product_components/forproduct";
describe("isIdProduct function:", () => {
  test("should return product id 82", () => {
    const id82 = {
      id: 82,
      title: "Kabir Singh Square Sunglass",
      description:
        "Orignal Metal Kabir Singh design 2020 Sunglasses Men Brand Designer Sun Glasses Kabir Singh Square Sunglass",
      price: 50,
      discountPercentage: 15.6,
      rating: 4.62,
      stock: 78,
      countBuyProduct: 1,
      brand: "Designer Sun Glasses",
      category: "sunglasses",
      thumbnail: "https://i.dummyjson.com/data/products/82/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/82/1.jpg",
        "https://i.dummyjson.com/data/products/82/2.webp",
        "https://i.dummyjson.com/data/products/82/3.jpg",
        "https://i.dummyjson.com/data/products/82/4.jpg",
        "https://i.dummyjson.com/data/products/82/thumbnail.jpg",
      ],
    };
    expect(isIdProduct(data, 82)).toEqual(id82);
  });
  test("should return product id 33", () => {
    const id33 = {
      id: 33,
      title: "3 Tier Corner Shelves",
      description:
        "3 Tier Corner Shelves | 3 PCs Wall Mount Kitchen Shelf | Floating Bedroom Shelf",
      price: 700,
      discountPercentage: 17,
      rating: 4.31,
      stock: 106,
      countBuyProduct: 1,
      brand: "Kitchen Shelf",
      category: "furniture",
      thumbnail: "https://i.dummyjson.com/data/products/33/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/33/1.jpg",
        "https://i.dummyjson.com/data/products/33/2.jpg",
        "https://i.dummyjson.com/data/products/33/3.jpg",
        "https://i.dummyjson.com/data/products/33/4.jpg",
        "https://i.dummyjson.com/data/products/33/thumbnail.jpg",
      ],
    };
    expect(isIdProduct(data, 33)).toEqual(id33);
  });
});
