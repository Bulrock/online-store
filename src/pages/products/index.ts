import "./products.css";
import { data } from "../../components/data";
import {
  drawPriceHeaderSummary,
  createArrUpData,
} from "../../components/cart_components/forcart";
import { Product, CartProduct } from "../../components/model/types";

let id: number;
const url = new URL(window.location.href);

if (url.searchParams.has("id")) {
  id = Number(url.searchParams.get("id"));
  if (!data.find((item) => item.id === id)) {
    document.location.href = "./error.html";
  }
}

const product = data.find((item) => item.id === id);
console.log(product);

const storage = localStorage.getItem("countBuyProduct");
console.log(storage);
let arrStorage: CartProduct[] = [];
if (typeof storage === "string" && storage.length > 0) {
  arrStorage = JSON.parse(storage);
}

const obj = arrStorage.find((item) => item.id === id);
let cartTotal = 0;
let countProducts = 0;
let upData: Product[] = [];

createArrUpData(arrStorage, upData);
upData.forEach((item) => {
  cartTotal += item.price * item.countBuyProduct;
  countProducts += item.countBuyProduct;
});

drawPriceHeaderSummary(cartTotal, countProducts, upData);

drowProduct();

function drowProduct() {
  (document.querySelector(".header-product") as HTMLElement).innerHTML = `
    <p class="topic market">STORE</p>
    <p>>></p>
    <p class="topic category">${product?.category.toLocaleUpperCase()}</p>
    <p>>></p>
    <p class="topic brand">${product?.brand.toLocaleUpperCase()}</p>
    <p>>></p>
    <p class="topic title">${product?.title.toLocaleUpperCase()}</p>
  `;

  (document.querySelector(".product") as HTMLElement).innerHTML = `
    <div class="product_header"><h2>${product?.title}</h2></div>
    <div class="product_block">
      <div class="product_images-description">
        <div class="product_images">
          <div class="product_images_list-image"></div>
          <div class="product_images_show-image">
            <img src="${product?.thumbnail}" alt="img">
          </div>
        </div>
        <div class="product_description">
          <div class="property description">
            <h3 class="header-property">Description:</h3>
            <p class="descr-property">${product?.description}</p>
          </div>
          <div class="property discount">
            <h3 class="header-property">Discount Percentage:</h3>
            <p class="descr-property">${product?.discountPercentage}</p>
          </div>
          <div class="property rating">
            <h3 class="header-property">Rating:</h3>
            <p class="descr-property">${product?.rating}</p>
          </div>
          <div class="property stock">
            <h3 class="header-property">Stock:</h3>
            <p class="descr-property">${product?.stock}</p>
          </div>
          <div class="property brand">
            <h3 class="header-property">Brand:</h3>
            <p class="descr-property">${product?.brand}</p>
          </div>
          <div class="property category">
            <h3 class="header-property">Category:</h3>
            <p class="descr-property">${product?.category}</p>
          </div>
        </div>
      </div>
      <div class="product_buy">
        <p class="price">€${product?.price}</p>
        <div class="button">
          <button class="add-drop_button"></button>
          <button class="buy-now">BUY NOW</button>
        </div>
    </div>
  `;

  if (product?.images)
    for (let i = 0; i < product.images.length; i++) {
      const img = document.createElement("img");
      img.src = `${product.images[i]}`;
      document.querySelector(".product_images_list-image")?.append(img);
    }

  if (arrStorage.find((item) => item.id === product?.id)) {
    (document.querySelector(".add-drop_button") as HTMLElement).innerHTML =
      "DROP FROM CART";
  } else {
    (document.querySelector(".add-drop_button") as HTMLElement).innerHTML =
      "ADD TO CART";
  }
}

(document.querySelector(".add-drop_button") as HTMLElement).addEventListener(
  "click",
  () => {
    const element = arrStorage.find((item) => item.id == id);
    if (element) {
      const index = arrStorage.indexOf(element);
      arrStorage.splice(index, 1);
      (document.querySelector(".add-drop_button") as HTMLElement).innerHTML =
        "ADD TO CART";
    } else if (!element) {
      obj !== undefined
        ? arrStorage.push(obj)
        : arrStorage.push({ id: id, count: 1 });
      console.log(arrStorage);
      (document.querySelector(".add-drop_button") as HTMLElement).innerHTML =
        "DROP FROM CART";
    }
    upData = [];
    cartTotal = 0;
    countProducts = 0;
    createArrUpData(arrStorage, upData);
    upData.forEach((item) => {
      cartTotal += item.price * item.countBuyProduct;
      countProducts += item.countBuyProduct;
    });
    console.log(upData);
    drawPriceHeaderSummary(cartTotal, countProducts, upData);
    localStorage.setItem("countBuyProduct", JSON.stringify(arrStorage));
  }
);

(document.querySelector(".basket") as HTMLElement).addEventListener(
  "click",
  () => {
    document.location.href = "./cart.html";
  }
);

(document.querySelector(".buy-now") as HTMLElement).addEventListener(
  "click",
  () => {
    const element = arrStorage.find((item) => item.id == id);
    if (!element) {
      obj !== undefined
        ? arrStorage.push(obj)
        : arrStorage.push({ id: id, count: 1 });
    }
    localStorage.setItem("countBuyProduct", JSON.stringify(arrStorage));
    document.location.href = "./cart.html#modal";
  }
);
