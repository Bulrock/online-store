import "./cart.css";
import { data } from "../../components/data";
type Data = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
const upData: Data[] = data.slice(0, 20);
/* if (upData.length === 0){
    document.querySelector('.main')
} */

const a = 3;
let page = Number(
  (document.querySelector(".page-view") as HTMLElement).innerHTML
);
let counUpData: Array<Data[]> = [];
changeArr(a);

document.querySelector(".item")?.addEventListener("input", () => {
  const value = (document.querySelector(".item") as HTMLInputElement).value;
  let valueNumber = Number(value);
  if (!value) {
    valueNumber = a;
  }
  changeArr(valueNumber);
  if (counUpData.length < page) {
    page = counUpData.length;
    (document.querySelector(".page-view") as HTMLElement).innerHTML = "" + page;
  }
  draw(page);
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
  draw(page);
});
document.querySelector(".arrow_next")?.addEventListener("click", () => {
  console.log("next");
  page >= counUpData.length ? (page = counUpData.length) : page++;
  console.log(page);
  (document.querySelector(".page-view") as HTMLElement).innerHTML = "" + page;
  draw(page);
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

function draw(page: number) {
  (document.querySelector(".products_description") as HTMLElement).innerHTML =
    "";

  counUpData[page - 1].forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="product_number">${index + 1}</div>
          <div class="product_descr">
              <img class="product_img" src="${item.images[0]}" alt="${
      item.title
    }">
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
          <div class="product_controlls">
              <p class="stock">Stock: ${item.stock}</p>
              <div class="product_controlls_controller">
                  <div class="sign minus"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg></div>
                  <p class="count-item">1</p>
                  <div class=" sign plus"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg></div>
              </div>
              <div class="product-controll_money">€${item.price}</div>
          </div>`;
    div.setAttribute("class", "product");
    document.querySelector(".products_description")?.appendChild(div);
  });
}

draw(page);
(document.querySelector(".item") as HTMLInputElement).value = String(a);
