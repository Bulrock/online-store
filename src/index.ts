import "./style.css";
import logo from "./assets/rs_school.svg";
import icon from "./assets/github_icon.svg";
import productList from "./components/data";
import { Product } from "./components/model/types";
import Cart from "./components/model/cart";
import Filters from "./components/model/filters";

const cart = new Cart(productList);
const filters = new Filters(
  productList.getAllCategories(),
  productList.getAllBrands(),
  productList.getMinPrice(),
  productList.getMaxPrice(),
  productList.getMinStock(),
  productList.getMaxStock(),
  ""
);

// function setLocalStorage(): void {
//   localStorage.setItem("stateMain", JSON.stringify(stateMain));
// }

// window.addEventListener("beforeunload", setLocalStorage);

// function getLocalStorage(): void {
//   if (localStorage.getItem("stateMain")) {
//     stateMain = JSON.parse(localStorage.getItem("stateMain") || "{}");
//   }
// }

// getLocalStorage();

const logoSchool = <HTMLImageElement>document.querySelector(".logo");

if (logoSchool) {
  logoSchool.setAttribute("src", logo);
}

const iconGit = document.querySelector(".icon");

if (iconGit) {
  iconGit.setAttribute("src", icon);
}

const filterCategoryList = <HTMLElement>(
  document.querySelector(".category-list")
);

function createCategoryFilter(
  filteredElem: Array<string | number | string[] | undefined>
): void {
  const temp = <HTMLTemplateElement>(
    document.getElementsByTagName("template")[0]
  );

  const item = temp.content.querySelector(".category-container");
  const dataLength: number = filteredElem.length;

  if (item) {
    for (let i = 0; i < dataLength; i++) {
      const a = <HTMLElement>document.importNode(item, true);
      const categoryInput = <HTMLInputElement>(
        a.querySelector(".category-input")
      );
      const categoryLabel = <HTMLLabelElement>(
        a.querySelector(".category-label")
      );
      const categorySpan = <HTMLElement>a.querySelector(".category-span");

      categoryInput.type = "checkbox";

      if (
        typeof filteredElem[i] === "string" &&
        filteredElem[i] !== undefined
      ) {
        categoryInput.id = `${filteredElem[i]}`;
        categoryInput.addEventListener("change", onCategoryCheckboxClick);
        categoryLabel.setAttribute("for", `${filteredElem[i]}`);
        categoryLabel.textContent = `${filteredElem[i]}`;
      }

      categorySpan.textContent = "(5/5)";
      filterCategoryList.appendChild(a);
    }
  }
}

function onCategoryCheckboxClick(event: Event): void {
  const id = (<HTMLInputElement>event.target)?.id;
  const isChecked = (<HTMLInputElement>event.target)?.checked;
  filters.changeCategoryFilter(id, isChecked);
  redrawProducts();
}

const categoryArr = productList.getPropertyValues<string>("category");

createCategoryFilter(categoryArr);

const filterBrandList = <HTMLElement>document.querySelector(".brand-list");

function createBrandFilter(
  filteredElem: Array<string | number | string[] | undefined>
): void {
  const temp = <HTMLTemplateElement>(
    document.getElementsByTagName("template")[1]
  );

  const item = temp.content.querySelector(".brand-container");
  const dataLength: number = filteredElem.length;

  if (item) {
    for (let i = 0; i < dataLength; i++) {
      const a = <HTMLElement>document.importNode(item, true);
      const categoryInput = <HTMLInputElement>a.querySelector(".brand-input");
      const categoryLabel = <HTMLLabelElement>a.querySelector(".brand-label");
      const categorySpan = <HTMLElement>a.querySelector(".brand-span");

      categoryInput.type = "checkbox";

      if (
        typeof filteredElem[i] === "string" &&
        filteredElem[i] !== undefined
      ) {
        categoryInput.id = `${filteredElem[i]}`;
        categoryInput.addEventListener("change", onBrandCheckboxClick);
        categoryLabel.setAttribute("for", `${filteredElem[i]}`);
        categoryLabel.textContent = `${filteredElem[i]}`;
      }

      categorySpan.textContent = "(5/5)";
      filterBrandList.appendChild(a);
    }
  }
}

function onBrandCheckboxClick(event: Event): void {
  const id = (<HTMLInputElement>event.target)?.id;
  const isChecked = (<HTMLInputElement>event.target)?.checked;
  filters.changeBrandFilter(id, isChecked);
  redrawProducts();
}

const brandArr = productList.getPropertyValues<string>("brand");

createBrandFilter(brandArr);

//Filtration
function getSelectedCategories(): string[] {
  const categoryElements: NodeListOf<Element> = document.querySelectorAll(
    ".category-input"
  );

  const categoryArr: string[] = [];

  if (categoryElements) {
    categoryElements.forEach((elem) => {
      if ((<HTMLInputElement>elem).checked === true) {
        categoryArr.push(elem.id);
      }
    });
  }
  return categoryArr;
}

function getSelectedBrands(): string[] {
  const brandElements: NodeListOf<Element> = document.querySelectorAll(
    ".brand-input"
  );

  const brandArr: string[] = [];

  if (brandElements) {
    brandElements.forEach((elem) => {
      if ((<HTMLInputElement>elem).checked === true) {
        brandArr.push(elem.id);
      }
    });
  }
  return brandArr;
}

const searchInput = <HTMLInputElement>document.querySelector(".search-product");
searchInput.addEventListener("input", onSearchInputChange);

function onSearchInputChange() {
  filters.searchInput = searchInput.value;
  redrawProducts();
}

const minPriceInput = <HTMLInputElement>document.getElementById("price-from");
minPriceInput.addEventListener("input", onMinPriceChange);

function onMinPriceChange() {
  filters.priceFrom = Number(minPriceInput.value);
  redrawProducts();
}

const maxPriceInput = <HTMLInputElement>document.getElementById("price-to");
maxPriceInput.addEventListener("input", onMaxPriceChange);

function onMaxPriceChange() {
  filters.priceTo = Number(maxPriceInput.value);
  redrawProducts();
}

const minStockInput = <HTMLInputElement>document.getElementById("stock-from");
minStockInput.addEventListener("input", onMinStockChange);

function onMinStockChange() {
  filters.stockFrom = Number(minStockInput.value);
  redrawProducts();
}

const maxStockInput = <HTMLInputElement>document.getElementById("stock-to");
maxStockInput.addEventListener("input", onMaxStockChange);

function onMaxStockChange() {
  filters.stockTo = Number(maxStockInput.value);
  redrawProducts();
}

const productsItems = <HTMLElement>document.querySelector(".products-items");

function drawProducts(productsArray: Array<Product>): void {
  const temp = <HTMLTemplateElement>(
    document.getElementsByTagName("template")[2]
  );

  const removedElements: NodeListOf<Element> = document.querySelectorAll(
    ".big-item"
  );
  removedElements.forEach((elem) => elem.remove());

  const item = temp.content.querySelector(".big-item");

  if (item) {
    for (let i = 0; i < productsArray.length; i++) {
      const a = <HTMLElement>document.importNode(item, true);

      const itemWrapper = <HTMLElement>a.querySelector(".item-wrapper");
      const itemTitle = <HTMLElement>a.querySelector(".item-title");
      const itemInfoCategory = <HTMLElement>a.querySelector(".p-category");
      const itemInfoBrand = <HTMLElement>a.querySelector(".p-brand");
      const itemInfoPrice = <HTMLElement>a.querySelector(".p-price");
      const itemInfoDiscount = <HTMLElement>a.querySelector(".p-discount");
      const itemInfoRating = <HTMLElement>a.querySelector(".p-rating");
      const itemInfoStock = <HTMLElement>a.querySelector(".p-stock");

      const btnAddCart = <HTMLButtonElement>a.querySelector(".btn-add-cart");
      btnAddCart.setAttribute("id", `add-${productsArray[i].id}`);
      btnAddCart.addEventListener("click", addItemToCart);

      const btnDropCart = <HTMLButtonElement>a.querySelector(".btn-drop-cart");
      btnDropCart.setAttribute("id", `drop-${productsArray[i].id}`);
      btnDropCart.addEventListener("click", deleteItemFromCart);

      itemWrapper.setAttribute(
        "style",
        `background: url(${productsArray[i].thumbnail}) 0% 0% / cover`
      );
      itemTitle.textContent = productsArray[i].title;
      itemInfoCategory.textContent = productsArray[i].category;
      itemInfoBrand.textContent = productsArray[i].brand;
      itemInfoPrice.textContent = `€${productsArray[i].price}.00`;
      itemInfoDiscount.textContent = `${productsArray[i].discountPercentage}%`;
      itemInfoRating.textContent = `${productsArray[i].rating}`;
      itemInfoStock.textContent = `${productsArray[i].stock}`;

      productsItems.appendChild(a);
    }
  }
}

drawProducts(productList.products);

function redrawProducts(): void {
  const productsStats = <HTMLElement>document.querySelector(".stat");
  const selectedBrands = getSelectedBrands();
  const selectedCategories = getSelectedCategories();

  const list = productList.filterProducts(
    selectedCategories,
    selectedBrands,
    filters.searchInput,
    filters.priceFrom,
    filters.priceTo,
    filters.stockFrom,
    filters.stockTo
  );

  drawProducts(list);

  productsStats.textContent = `Found: ${list.length}`;

  updateUrl();
}

function addItemToCart(e: Event): void {
  const productId = Number((<HTMLElement>e.target).id.slice(4));
  const btnAddCart = <HTMLButtonElement>(
    document.getElementById(`add-${productId}`)
  );
  btnAddCart.setAttribute("style", "display: none;");
  const btnDropCart = <HTMLButtonElement>(
    document.getElementById(`drop-${productId}`)
  );
  btnDropCart.setAttribute("style", "display: block;");

  cart.add(productId);
  refreshAmountProductsCart();

  const cartPrice = <HTMLElement>document.querySelector(".cart-price");
  cartPrice.textContent = `${cart.getProductsTotalPrice()}`;
}

function deleteItemFromCart(e: Event): void {
  const productId = Number((<HTMLElement>e.target).id.slice(5));
  const btnDropCart = <HTMLButtonElement>(
    document.getElementById(`drop-${productId}`)
  );
  btnDropCart.setAttribute("style", "display: none;");
  const btnAddCart = <HTMLButtonElement>(
    document.getElementById(`add-${productId}`)
  );
  btnAddCart.setAttribute("style", "display: block;");

  cart.delete(productId);
  refreshAmountProductsCart();

  const cartPrice = <HTMLElement>document.querySelector(".cart-price");
  cartPrice.textContent = `${cart.getProductsTotalPrice()}`;
}

function refreshAmountProductsCart(): void {
  const amountProductsCart = <HTMLElement>(
    document.querySelector(".product-amount")
  );
  amountProductsCart.textContent = `${cart.getProductsCount()}`;
}

function updateUrl() {
  const url = new URL(window.location.href);
  const checkedCategories = filters.getCheckedCategories();
  const checkedBrands = filters.getCheckedBrands();

  checkedCategories.length
    ? url.searchParams.set("category", checkedCategories.join("↕"))
    : url.searchParams.delete("category");

  checkedBrands.length
    ? url.searchParams.set("brand", checkedBrands.join("↕"))
    : url.searchParams.delete("brand");

  // Now update the current URL
  window.history.replaceState(null, "", url);
}
