import logo from "../../assets/rs_school.svg";
import icon from "../../assets/github_icon.svg";

import { Product, CartProduct } from "../model/types";
import { data } from "../data";
import { drawNumber } from "./draw-number";

export function createArrUpData(
  arrFromStorage: CartProduct[],
  upData: Product[]
) {
  for (let i = 0; i < arrFromStorage.length; i++) {
    const product = data.find((item) => item.id == arrFromStorage[i].id);

    if (product) {
      upData.push(product);
      upData[i].countBuyProduct = arrFromStorage[i].count;
    }
  }
}

export function drawPriceHeaderSummary(
  sumprice: number,
  sumproducts: number,
  arr: Product[]
): void {
  const spanSummaryTotatl = document.querySelector(
    ".summary_total span"
  ) as HTMLElement;
  const spanSummaryProducts = document.querySelector(
    ".summary_products span"
  ) as HTMLElement;
  (document.querySelector(".header_price span") as HTMLElement).innerHTML =
    "" + sumprice;
  (document.querySelector(
    ".header_basket_count-product"
  ) as HTMLElement).innerHTML = "" + sumproducts;
  if (arr && spanSummaryTotatl && spanSummaryProducts) {
    spanSummaryTotatl.innerHTML = "" + sumprice;
    spanSummaryProducts.innerHTML = "" + sumproducts;
  }
}

export function drawIfCartEmpty(arr: Product[]): void {
  if (arr.length === 0) {
    (document.querySelector(
      ".main"
    ) as HTMLElement).innerHTML = `<p class="empty-cart">Cart is Empty</p>`;
    (document.querySelector(".main") as HTMLElement).style.justifyContent =
      "center";
  }
}

/* function drawNumber(page: number, arr: Array<Product[]>, index: number) {
  return (page - 1) * arr[0].length + index + 1;
} */

export function draw(page: number, arr: Array<Product[]>): void {
  const viewPage = document.querySelector(".page-view") as HTMLElement;
  if (viewPage) viewPage.innerHTML = "" + page;
  const blockProducts = document.querySelector(
    ".products_description"
  ) as HTMLElement;
  if (blockProducts) {
    blockProducts.innerHTML = "";

    if (arr[page - 1]) {
      arr[page - 1].forEach((item, index) => {
        console.log(arr);
        const number = drawNumber(page, arr, index);
        const div = document.createElement("div");
        div.innerHTML = `
          <div class="wrapper_product-number-descr">
            <div class="wrapper_number-img">
              <div class="product_number">${number}</div>
              <img class="product_img" src="${item.images[0]}" alt="${
          item.title
        }">
            </div>
            <div class="product_descr">
              <div class="product_about">
                <p class="product_about_name">${item.title}</p>
                <p class="product_about_description">${item.description}</p>
                <div class="product_about_raiting-discount">
                    <p class="product_about_raiting-discount_raiting">Rating: ${
                      item.rating
                    }</p>
                    <p class="product_about_raiting-discount_discount">Discount: ${
                      item.discountPercentage
                    }</p>
                </div>
              </div>
            </div>
          </div>
          <div class="product_controlls">
              <p class="stock">Stock: <span>${item.stock}</span></p>
              <div class="product_controlls_controller">
                  <div class="sign minus"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg></div>
                  <p class="count-item">${item.countBuyProduct}</p>
                  <div class="sign plus"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg></div>
              </div>
              <div class="product-controll_money">€${
                item.price * item.countBuyProduct
              }</div>
          </div>`;
        div.setAttribute("class", "product");
        div.setAttribute("id", `${item.id}`);
        (document.querySelector(
          ".products_description"
        ) as HTMLElement).appendChild(div);
      });
    } else {
      const p = document.createElement("p");
      p.setAttribute("class", "noPage");
      p.innerHTML = `Pages with number ${page} does not exist`;
      (document.querySelector(".products_description") as HTMLElement).append(
        p
      );
    }
  }
}

type Promo = {
  id: string;
  name: string;
  discount: number;
};

export const arrPromo: Promo[] = [
  {
    id: "rs",
    name: "RSSchool",
    discount: 10,
  },
  {
    id: "epm",
    name: "EPAMSystem",
    discount: 10,
  },
];

function drowButtonADD() {
  const divbutton: HTMLDivElement = document.createElement("div");
  divbutton.innerHTML = "ADD";
  divbutton.setAttribute("class", "button-ADD");
  (document.querySelector(".add-promo") as HTMLElement).append(divbutton);
}

export function drawblockPromoADD(
  value: string,
  discount: number,
  id: string
): void {
  console.log(value + discount);
  const div: HTMLDivElement = document.createElement("div");
  div.innerHTML = `
    <p class="name-discount">${value} - ${discount}%</p>
  `;
  div.setAttribute("class", "add-promo");
  (document.querySelector(".add") as HTMLElement).append(div);
  if (!document.getElementById(`${id}`)) {
    drowButtonADD();
  } else {
    (document.querySelector(
      ".name-discount"
    ) as HTMLElement).innerHTML = `${value} - ${discount}% - Discount already applied`;
  }
}

export function drawDropTable() {
  const div: HTMLDivElement = document.createElement("div");
  div.innerHTML = `
    <div class="drop-table_header">Applied codes</div>
    <div class="drop-table_wrap"></div>
  `;
  div.setAttribute("class", "drop-table");
  (document.querySelector(".summary_form_promo .drop") as HTMLElement).append(
    div
  );
}

export function drawblockPromoDROP(
  value: string,
  discount: number,
  id: string
): void {
  const divName: HTMLDivElement = document.createElement("div");
  divName.innerHTML = `
  <p>${value} - ${discount}%</p>
    <div class="button-DROP">DROP</div>
  `;
  divName.setAttribute("id", id);
  divName.setAttribute("class", "drop-promo");
  (document.querySelector(
    ".summary_form_promo .drop-table_wrap"
  ) as HTMLElement).append(divName);
}

export function drawDiscountCartTotal(
  cartTotal: number,
  discountCartTotal: number
) {
  const totalAfterDiscount = cartTotal * ((100 - discountCartTotal) / 100);
  if (document.querySelector(".summary_total") as HTMLElement) {
    (document.querySelector(
      ".summary_total"
    ) as HTMLElement).style.textDecoration = "line-through";
  }
  if (!(document.querySelector(".summary_total-discount") as HTMLElement)) {
    const p = document.createElement("p");
    p.setAttribute("class", "summary_total-discount");
    p.innerHTML = `Total: €${totalAfterDiscount.toFixed(2)}`;
    if (document.querySelector(".total") as HTMLElement) {
      (document.querySelector(".total") as HTMLElement).append(p);
    }
  } else {
    (document.querySelector(
      ".summary_total-discount"
    ) as HTMLElement).innerHTML = `Total: €${totalAfterDiscount.toFixed(2)}`;
  }
}

export function addLinkCithubRS() {
  const logoSchool = <HTMLImageElement>document.querySelector(".logoRS");

  if (logoSchool) {
    logoSchool.setAttribute("src", logo);
  }

  const iconGit1 = <HTMLImageElement>document.querySelector(".github-icon1");
  const iconGit2 = <HTMLImageElement>document.querySelector(".github-icon2");

  if (iconGit1 && iconGit2) {
    iconGit1.setAttribute("src", icon);
    iconGit2.setAttribute("src", icon);
  }
}
