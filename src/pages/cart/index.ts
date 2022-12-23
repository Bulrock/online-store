import "./cart.css";
import { data } from "../../components/data";
import {
  draw,
  drawPriceHeaderSummary,
  drawIfCartEmpty,
  drawblockPromoADD,
  drawDropTable,
  drawblockPromoDROP,
  arrPromo,
  drawDiscountCartTotal,
} from "../../components/cart_components/forcart";
import { showModalWindow } from "../../components/cart_components/modal_window_cart";
import type { Data } from "../../components/cart_components/forcart";

const storage = localStorage.getItem("cartProductIds");
let arrStorage: number[] = [];
if (typeof storage === "string") {
  arrStorage = JSON.parse(storage);
}

/* const arrId: number[] = [1, 3, 6, 8, 9, 12, 14, 15, 16, 17, 20]; */
const upData: Data[] = [];

for (let i = 0; i < arrStorage.length; i++) {
  const product = data.find((item) => item.id == arrStorage[i]);
  if (product) {
    upData.push(product);
  }
}

drawIfCartEmpty(upData);
console.log(upData);

const a = 3;
let page = 1;
let counUpData: Array<Data[]> = [];
changeArr(a);

let cartTotal = 0;
let discountCartTotal = 0;
let countProducts = 0;

upData.forEach((item) => {
  cartTotal += item.price;
  countProducts++;
});

drawPriceHeaderSummary(cartTotal, countProducts, upData);

draw(page, counUpData);
changeCountProduct();
if (document.querySelector(".item") as HTMLInputElement) {
  (document.querySelector(".item") as HTMLInputElement).value = "" + a;
}

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
              if (discountCartTotal > 0) {
                drawDiscountCartTotal(cartTotal, discountCartTotal);
              }
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
              if (discountCartTotal > 0) {
                drawDiscountCartTotal(cartTotal, discountCartTotal);
              }
            }
          }
        } else {
          return;
        }
      }
    });
  });
}

const inputForPromo = document.querySelector(
  ".summary_form_promo_input"
) as HTMLInputElement;
let value;
if (inputForPromo) {
  inputForPromo.addEventListener("input", () => {
    value = inputForPromo.value;
    console.log(`${value}: ${typeof value}`);

    for (let i = 0; i < arrPromo.length; i++) {
      if (value === arrPromo[i].id) {
        console.log(typeof arrPromo[i].id);
        drawblockPromoADD(
          arrPromo[i].name,
          arrPromo[i].discount,
          arrPromo[i].id
        );
        if (document.querySelector(".button-ADD") as HTMLElement) {
          (document.querySelector(
            ".button-ADD"
          ) as HTMLElement).addEventListener("click", function drawDrop() {
            discountCartTotal += arrPromo[i].discount;
            drawDiscountCartTotal(cartTotal, discountCartTotal);
            if (!document.querySelector(".drop-table")) {
              drawDropTable();
            }
            drawblockPromoDROP(
              arrPromo[i].name,
              arrPromo[i].discount,
              arrPromo[i].id
            );
            (document.querySelector(
              ".button-ADD"
            ) as HTMLElement).removeEventListener("click", drawDrop);
            inputForPromo.value = "";
            if (document.querySelector(".add-promo") as HTMLElement) {
              (document.querySelector(".add-promo") as HTMLElement).remove();
            }
            ((document.getElementById(
              `${arrPromo[i].id}`
            ) as HTMLElement).querySelector(
              ".button-DROP"
            ) as HTMLElement).addEventListener("click", () => {
              console.log("click2");
              discountCartTotal -= arrPromo[i].discount;
              drawDiscountCartTotal(cartTotal, discountCartTotal);
              inputForPromo.value = "";
              if (document.querySelector(".add-promo") as HTMLElement) {
                (document.querySelector(".add-promo") as HTMLElement).remove();
              }
              document.getElementById(`${arrPromo[i].id}`)?.remove();
              if (
                document.querySelector(".drop-table_wrap")?.innerHTML === ""
              ) {
                (document.querySelector(".drop-table") as HTMLElement).remove();
                (document.querySelector(
                  ".summary_total-discount"
                ) as HTMLElement).remove();
                (document.querySelector(
                  ".summary_total"
                ) as HTMLElement).style.textDecoration = "none";
              }
            });
            console.log(discountCartTotal);
          });
        }
        break;
      } else {
        console.log("удалил блок");
        if (document.querySelector(".add-promo") as HTMLElement) {
          (document.querySelector(".add-promo") as HTMLElement).remove();
        }
      }
    }
  });
}

showModalWindow();
