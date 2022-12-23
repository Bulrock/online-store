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
import { Product, Storage } from "../../components/model/types";

/* const storage = localStorage.getItem("cartProductIds");
console.log(storage);
let arrStorage: number[] = [];
if (typeof storage === "string" && storage.length > 0) {
  arrStorage = JSON.parse(storage);
} */

const arrStorage: Storage[] = [
  { id: 1, countBuyProduct: 3 },
  { id: 3, countBuyProduct: 1 },
  { id: 5, countBuyProduct: 2 },
  { id: 6, countBuyProduct: 1 },
  { id: 8, countBuyProduct: 1 },
  { id: 10, countBuyProduct: 1 },
  { id: 15, countBuyProduct: 1 },
  { id: 21, countBuyProduct: 1 },
  { id: 81, countBuyProduct: 1 },
];

let page = 1;
let cartTotal = 0;
let discountCartTotal = 0;
let countProducts = 0;
let valueNumber = 3;
let counUpData: Array<Product[]> = [];
const upData: Product[] = [];

for (let i = 0; i < arrStorage.length; i++) {
  const product = data.find((item) => item.id == arrStorage[i].id);

  if (product) {
    upData.push(product);
    upData[i].countBuyProduct = arrStorage[i].countBuyProduct;
  }
}
upData.forEach((item) => {
  cartTotal += item.price * item.countBuyProduct;
  countProducts += item.countBuyProduct;
});

drawIfCartEmpty(upData);
changeArr(3);
drawPriceHeaderSummary(cartTotal, countProducts, upData);
draw(page, counUpData);
changeCountProduct();
showModalWindow();

const item = document.querySelector(".item") as HTMLInputElement;
const viewPage = document.querySelector(".page-view") as HTMLElement;
const inputForPromo = document.querySelector(
  ".summary_form_promo_input"
) as HTMLInputElement;

if (item) {
  item.value = "" + 3;
}

item.addEventListener("input", () => {
  const value = item.value;
  valueNumber = Number(value);
  if (!value) {
    valueNumber = 3;
  }
  changeArr(valueNumber);
  if (counUpData.length < page) {
    page = counUpData.length;
    viewPage.innerHTML = "" + page;
  }
  draw(page, counUpData);
  changeCountProduct();
  console.log(counUpData);
});

item.addEventListener("change", () => {
  if (!item.value) item.value = "" + 3;
});

(document.querySelector(".arrow_prev") as HTMLElement).addEventListener(
  "click",
  () => {
    console.log("prev");
    page === 1 ? (page = 1) : page--;
    console.log(page);
    viewPage.innerHTML = "" + page;
    draw(page, counUpData);
    changeCountProduct();
  }
);
(document.querySelector(".arrow_next") as HTMLElement).addEventListener(
  "click",
  () => {
    console.log("next");
    page >= counUpData.length ? (page = counUpData.length) : page++;
    console.log(page);
    viewPage.innerHTML = "" + page;
    draw(page, counUpData);
    changeCountProduct();
  }
);

function changeArr(count: number) {
  counUpData = [];
  let arr: Product[] = [];
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

        if (targetClossestClass === "sign minus") {
          console.log("minus");
          console.log(page);
          for (let i = 0; i < upData.length; i++) {
            if (upData[i].title === nameProduct) {
              cartTotal = cartTotal - upData[i].price;
              countProducts--;
              if (upData[i].countBuyProduct === 1) {
                upData.splice(i, 1);
                arrStorage.splice(i, 1);
                drawIfCartEmpty(upData);
                changeArr(valueNumber);
                page > counUpData.length ? (page = counUpData.length) : page;

                viewPage.innerHTML = "" + page;
                draw(page, counUpData);
                changeCountProduct();
              } else {
                upData[i].countBuyProduct -= 1;
                arrStorage[i].countBuyProduct = upData[i].countBuyProduct;
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

              arrStorage[i].countBuyProduct = upData[i].countBuyProduct;
              console.log(arrStorage);

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
        localStorage.setItem("cartProductIds", JSON.stringify(arrStorage));
      }
    });
  });
}

let value;
if (inputForPromo) {
  inputForPromo.addEventListener("input", () => {
    const addPromo = document.querySelector(".add-promo") as HTMLElement;
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
        const buttonADD = document.querySelector(".button-ADD") as HTMLElement;
        if (buttonADD) {
          buttonADD.addEventListener("click", function drawDrop() {
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
            buttonADD.removeEventListener("click", drawDrop);
            inputForPromo.value = "";
            const addPromo = document.querySelector(
              ".add-promo"
            ) as HTMLElement;
            if (addPromo) addPromo.remove();
            ((document.getElementById(
              `${arrPromo[i].id}`
            ) as HTMLElement).querySelector(
              ".button-DROP"
            ) as HTMLElement).addEventListener("click", () => {
              console.log("click2");
              discountCartTotal -= arrPromo[i].discount;
              drawDiscountCartTotal(cartTotal, discountCartTotal);
              inputForPromo.value = "";
              const addPromo = document.querySelector(
                ".add-promo"
              ) as HTMLElement;
              if (addPromo) addPromo.remove();
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
        if (addPromo) addPromo.remove();
      }
    }
  });
}
