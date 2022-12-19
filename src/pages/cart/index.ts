import "./cart.css";
import { data } from "../../components/data";
import {
  draw,
  drawPriceHeaderSummary,
  drawIfCartEmpty,
} from "../../components/cart_components/forcart";
import type { Data } from "../../components/cart_components/forcart";

const upData: Data[] = data.slice(0, 20);
drawIfCartEmpty(upData);
console.log(upData);

const a = 3;
let page = Number(
  (document.querySelector(".page-view") as HTMLElement).innerHTML
);
let counUpData: Array<Data[]> = [];
changeArr(a);

let cartTotal = 0;
let countProducts = 0;

upData.forEach((item) => {
  cartTotal += item.price;
  countProducts++;
});

drawPriceHeaderSummary(cartTotal, countProducts, upData);

draw(page, counUpData);
changeCountProduct();
(document.querySelector(".item") as HTMLInputElement).value = String(a);

let valueNumber = 3;

document.querySelector(".item")?.addEventListener("input", () => {
  const value = (document.querySelector(".item") as HTMLInputElement).value;
  valueNumber = Number(value);
  if (!value) {
    valueNumber = a;
  }
  changeArr(valueNumber);
  if (counUpData.length < page) {
    page = counUpData.length;
    (document.querySelector(".page-view") as HTMLElement).innerHTML = "" + page;
  }
  draw(page, counUpData);
  changeCountProduct();
  console.log(counUpData);
});

document.querySelector(".item")?.addEventListener("change", () => {
  const value = (document.querySelector(".item") as HTMLInputElement).value;
  if (!value) {
    (document.querySelector(".item") as HTMLInputElement).value = String(a);
  }
});
document.querySelector(".arrow_prev")?.addEventListener("click", () => {
  console.log("prev");
  page === 1 ? (page = 1) : page--;
  console.log(page);
  (document.querySelector(".page-view") as HTMLElement).innerHTML = "" + page;
  draw(page, counUpData);
  changeCountProduct();
});
document.querySelector(".arrow_next")?.addEventListener("click", () => {
  console.log("next");
  page >= counUpData.length ? (page = counUpData.length) : page++;
  console.log(page);
  (document.querySelector(".page-view") as HTMLElement).innerHTML = "" + page;
  draw(page, counUpData);
  changeCountProduct();
});

function changeArr(count: number) {
  counUpData = [];
  let arr: Data[] = [];
  for (let i = 0; i < upData.length; i++) {
    arr.push(upData[i]);
    if (arr.length === count) {
      counUpData.push(arr);
      arr = [];
    }
  }
  if (arr.length > 0) counUpData.push(arr);
}

function changeCountProduct() {
  document.querySelectorAll(".product").forEach((item) => {
    item?.addEventListener("click", (e) => {
      if (e.target) {
        const targetClossestClass = (e.target as HTMLElement)
          .closest("div")
          ?.getAttribute("class");
        const productControls = (e.target as HTMLElement).closest(
          ".product_controlls"
        );

        const productControlsCountItem = (productControls as HTMLElement).querySelector(
          ".count-item"
        ) as HTMLElement;
        const nameProduct = (e.target as HTMLElement)
          .closest(".product")
          ?.querySelector(".product_about_name")?.innerHTML;
        const productPrice = (productControls as HTMLElement).querySelector(
          ".product-controll_money"
        ) as HTMLElement;
        const pageView = document.querySelector(".page-view") as HTMLElement;

        console.log(nameProduct);

        if (targetClossestClass === "sign minus") {
          console.log("minus");
          console.log(page);
          for (let i = 0; i < upData.length; i++) {
            if (upData[i].title === nameProduct) {
              cartTotal = cartTotal - upData[i].price;
              countProducts--;
              if (upData[i].countBuyProduct === 1) {
                upData.splice(i, 1);
                drawIfCartEmpty(upData);
                if (upData[i]) {
                  upData[i].countBuyProduct = 1;
                }
                changeArr(valueNumber);
                console.log(counUpData);
                page > counUpData.length ? (page = counUpData.length) : page;

                pageView.innerHTML = "" + page;
                draw(page, counUpData);
                changeCountProduct();
              } else {
                upData[i].countBuyProduct -= 1;
              }
              if (
                productPrice &&
                productControlsCountItem &&
                upData.length > 0 &&
                upData[i]
              ) {
                productControlsCountItem.innerHTML =
                  "" + upData[i].countBuyProduct;
                productPrice.innerHTML =
                  "€" + upData[i].price * upData[i].countBuyProduct;
              }

              drawPriceHeaderSummary(cartTotal, countProducts, upData);
              console.log(upData[i]);
            }
          }
        } else if (targetClossestClass === "sign plus") {
          for (let i = 0; i < upData.length; i++) {
            if (upData[i].title === nameProduct) {
              if (upData[i].countBuyProduct >= upData[i].stock) {
                upData[i].countBuyProduct = upData[i].stock;
              } else {
                upData[i].countBuyProduct++;
                cartTotal = cartTotal + upData[i].price;
                countProducts++;
              }
              ((productControls as HTMLElement).querySelector(
                ".count-item"
              ) as HTMLElement).innerHTML = "" + upData[i].countBuyProduct;
              productPrice.innerHTML =
                "€" + upData[i].price * upData[i].countBuyProduct;

              drawPriceHeaderSummary(cartTotal, countProducts, upData);

              console.log(upData[i]);
            }
          }
        } else {
          return;
        }
      }
    });
  });
}
