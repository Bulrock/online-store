export type Data = {
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
  countBuyProduct: number;
};

export function drawPriceHeaderSummary(
  sumprice: number,
  sumproducts: number,
  arr: Data[]
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

export function drawIfCartEmpty(arr: Data[]): void {
  if (arr.length === 0) {
    (document.querySelector(
      ".main"
    ) as HTMLElement).innerHTML = `<p class="empty-cart">Cart is Empty</p>`;
    (document.querySelector(".main") as HTMLElement).style.justifyContent =
      "center";
  }
}

export function draw(page: number, arr: Array<Data[]>): void {
  const blockProducts = document.querySelector(
    ".products_description"
  ) as HTMLElement;
  if (blockProducts) {
    blockProducts.innerHTML = "";

    arr[page - 1].forEach((item, index) => {
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
      document.querySelector(".products_description")?.appendChild(div);
    });
  }
}
