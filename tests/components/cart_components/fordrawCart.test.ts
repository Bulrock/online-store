import {
  drawNumber,
  calculateDiscount,
} from "../../../src/components/cart_components/fordrawCart";

const arr = [
  [
    {
      id: 77,
      title: "Rose Ring",
      description:
        "Brand: The Greetings Flower Colour: RedRing Colour: GoldenSize: Adjustable",
      price: 100,
      discountPercentage: 3.22,
      rating: 4.21,
      stock: 149,
      countBuyProduct: 1,
      brand: "Copenhagen Luxe",
      category: "womens-jewellery",
      thumbnail: "https://i.dummyjson.com/data/products/77/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/77/1.jpg",
        "https://i.dummyjson.com/data/products/77/3.jpg",
        "https://i.dummyjson.com/data/products/77/thumbnail.jpg",
      ],
    },
    {
      id: 78,
      title: "Rhinestone Korean Style Open Rings",
      description:
        "Fashion Jewellery 3Pcs Adjustable Pearl Rhinestone Korean Style Open Rings For Women",
      price: 30,
      discountPercentage: 8.02,
      rating: 4.69,
      stock: 9,
      countBuyProduct: 1,
      brand: "Fashion Jewellery",
      category: "womens-jewellery",
      thumbnail: "https://i.dummyjson.com/data/products/78/thumbnail.jpg",
      images: ["https://i.dummyjson.com/data/products/78/thumbnail.jpg"],
    },
    {
      id: 79,
      title: "Elegant Female Pearl Earrings",
      description:
        "Elegant Female Pearl Earrings Set Zircon Pearl Earings Women Party Accessories 9 Pairs/Set",
      price: 30,
      discountPercentage: 12.8,
      rating: 4.74,
      stock: 16,
      countBuyProduct: 1,
      brand: "Fashion Jewellery",
      category: "womens-jewellery",
      thumbnail: "https://i.dummyjson.com/data/products/79/thumbnail.jpg",
      images: ["https://i.dummyjson.com/data/products/79/1.jpg"],
    },
  ],
  [
    {
      id: 80,
      title: "Chain Pin Tassel Earrings",
      description:
        "Pair Of Ear Cuff Butterfly Long Chain Pin Tassel Earrings - Silver ( Long Life Quality Product)",
      price: 45,
      discountPercentage: 17.75,
      rating: 4.59,
      stock: 9,
      countBuyProduct: 1,
      brand: "Cuff Butterfly",
      category: "womens-jewellery",
      thumbnail: "https://i.dummyjson.com/data/products/80/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/80/1.jpg",
        "https://i.dummyjson.com/data/products/80/2.jpg",
        "https://i.dummyjson.com/data/products/80/3.png",
        "https://i.dummyjson.com/data/products/80/4.jpg",
        "https://i.dummyjson.com/data/products/80/thumbnail.jpg",
      ],
    },
    {
      id: 81,
      title: "Round Silver Frame Sun Glasses",
      description:
        "A pair of sunglasses can protect your eyes from being hurt. For car driving, vacation travel, outdoor activities, social gatherings,",
      price: 19,
      discountPercentage: 10.1,
      rating: 4.94,
      stock: 78,
      countBuyProduct: 1,
      brand: "Designer Sun Glasses",
      category: "sunglasses",
      thumbnail: "https://i.dummyjson.com/data/products/81/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/81/1.jpg",
        "https://i.dummyjson.com/data/products/81/2.jpg",
        "https://i.dummyjson.com/data/products/81/3.jpg",
        "https://i.dummyjson.com/data/products/81/4.webp",
        "https://i.dummyjson.com/data/products/81/thumbnail.jpg",
      ],
    },
    {
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
    },
  ],
  [
    {
      id: 83,
      title: "Wiley X Night Vision Yellow Glasses",
      description:
        "Wiley X Night Vision Yellow Glasses for Riders - Night Vision Anti Fog Driving Glasses - Free Night Glass Cover - Shield Eyes From Dust and Virus- For Night Sport Matches",
      price: 30,
      discountPercentage: 6.33,
      rating: 4.97,
      stock: 115,
      countBuyProduct: 1,
      brand: "mastar watch",
      category: "sunglasses",
      thumbnail: "https://i.dummyjson.com/data/products/83/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/83/1.jpg",
        "https://i.dummyjson.com/data/products/83/2.jpg",
        "https://i.dummyjson.com/data/products/83/3.jpg",
        "https://i.dummyjson.com/data/products/83/4.jpg",
        "https://i.dummyjson.com/data/products/83/thumbnail.jpg",
      ],
    },
    {
      id: 84,
      title: "Square Sunglasses",
      description:
        "Fashion Oversized Square Sunglasses Retro Gradient Big Frame Sunglasses For Women One Piece Gafas Shade Mirror Clear Lens 17059",
      price: 28,
      discountPercentage: 13.89,
      rating: 4.64,
      stock: 64,
      countBuyProduct: 1,
      brand: "mastar watch",
      category: "sunglasses",
      thumbnail: "https://i.dummyjson.com/data/products/84/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/84/1.jpg",
        "https://i.dummyjson.com/data/products/84/2.jpg",
        "https://i.dummyjson.com/data/products/84/thumbnail.jpg",
      ],
    },
  ],
];
describe("drawNumbers function:", () => {
  test("should return number product", () => {
    expect(drawNumber(1, arr, 1)).toBe(2);
    expect(drawNumber(1, arr, 2)).toBe(3);
    expect(drawNumber(2, arr, 2)).toBe(6);
    expect(drawNumber(3, arr, 1)).toBe(8);
  });
  test("should return number product if page is less one", () => {
    expect(drawNumber(-1, arr, 1)).toBe(2);
    expect(drawNumber(0, arr, 0)).toBe(1);
  });
});

describe("calculateDiscount function:", () => {
  test("should return price with discount", () => {
    expect(calculateDiscount(5000, 20)).toBe(4000.0);
    expect(calculateDiscount(7700, 15)).toBe(6545.0);
    expect(calculateDiscount(4999, 30)).toBe(3499.3);
    expect(calculateDiscount(10302, 10)).toBe(9271.8);
  });
});
