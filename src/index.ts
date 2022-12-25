import "./style.css";
import logo from "./assets/rs_school.svg";
import icon from "./assets/github_icon.svg";
import smallViewBtn from "./assets/small_list.svg";
import hugeViewBtn from "./assets/huge_list.svg";
import productList from "./components/data";
import { Product } from "./components/model/types";
import Cart from "./components/model/cart";
import Filters from "./components/model/filters";

let filters = new Filters(
  productList.getAllCategories(),
  productList.getAllBrands(),
  productList.getMinPrice(),
  productList.getMaxPrice(),
  productList.getMinStock(),
  productList.getMaxStock(),
  "",
  ""
);

const url = new URL((<Window>window).location.href);
filters.setCheckedCategories(
  url.searchParams.get("category")?.split("↕") || []
);
filters.setCheckedBrands(url.searchParams.get("brand")?.split("↕") || []);
filters.priceFrom = Number(
  url.searchParams.get("price")?.split("↕")[0] || productList.getMinPrice()
);
filters.priceTo = Number(
  url.searchParams.get("price")?.split("↕")[1] || productList.getMaxPrice()
);
filters.stockFrom = Number(
  url.searchParams.get("stock")?.split("↕")[0] || productList.getMinStock()
);
filters.stockTo = Number(
  url.searchParams.get("stock")?.split("↕")[1] || productList.getMaxStock()
);
filters.searchInput = url.searchParams.get("search") || "";
filters.sortOptionValues = url.searchParams.get("sort") || "";

const cart = new Cart(productList);

const smallVBtn = <HTMLImageElement>document.querySelector(".small-v");

const lowerSlider = <HTMLInputElement>document.getElementById("lower"),
  upperSlider = <HTMLInputElement>document.getElementById("upper");
let lowerVal = parseInt(lowerSlider.value),
  upperVal = parseInt(upperSlider.value);

const minPriceLabel = <HTMLLabelElement>(
  document.getElementById("min-price-label")
);

const maxPriceLabel = <HTMLLabelElement>(
  document.getElementById("max-price-label")
);

upperSlider.oninput = function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);
  filters.priceTo = Number(upperSlider.value) || productList.getMaxPrice();
  redrawProducts();
  minPriceLabel.textContent = `€${lowerVal}.00`;
  maxPriceLabel.textContent = `€${upperVal}.00`;

  if (upperVal < lowerVal + 4) {
    lowerSlider.value = String(upperVal - 4);

    if (String(lowerVal) === lowerSlider.min) {
      upperSlider.value = String(4);
    }
  }
};

lowerSlider.oninput = function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);
  filters.priceFrom = Number(lowerSlider.value) || productList.getMinPrice();
  redrawProducts();
  minPriceLabel.textContent = `€${lowerVal}.00`;
  maxPriceLabel.textContent = `€${upperVal}.00`;

  if (lowerVal > upperVal - 4) {
    upperSlider.value = String(lowerVal + 4);

    if (upperVal === Number(upperSlider.max)) {
      lowerSlider.value = String(parseInt(upperSlider.max) - 4);
    }
  }
};

lowerSlider.min = String(productList.getMinPrice());
lowerSlider.max = String(productList.getMaxPrice());
upperSlider.min = String(productList.getMinPrice());
upperSlider.max = String(productList.getMaxPrice());

const lowerStockSlider = <HTMLInputElement>(
    document.getElementById("lower-stock")
  ),
  upperStockSlider = <HTMLInputElement>document.getElementById("upper-stock");
let lowerStockVal = parseInt(lowerStockSlider.value),
  upperStockVal = parseInt(upperStockSlider.value);

const minStockLabel = <HTMLLabelElement>(
  document.getElementById("min-stock-label")
);

const maxStockLabel = <HTMLLabelElement>(
  document.getElementById("max-stock-label")
);

upperStockSlider.oninput = function () {
  lowerStockVal = parseInt(lowerStockSlider.value);
  upperStockVal = parseInt(upperStockSlider.value);
  filters.stockTo = Number(upperStockSlider.value) || productList.getMaxStock();
  redrawProducts();
  minStockLabel.textContent = String(lowerStockVal);
  maxStockLabel.textContent = String(upperStockVal);

  if (upperStockVal < lowerStockVal + 4) {
    lowerStockSlider.value = String(upperStockVal - 4);

    if (String(lowerStockVal) === lowerStockSlider.min) {
      upperStockSlider.value = String(4);
    }
  }
};

lowerStockSlider.oninput = function () {
  lowerStockVal = parseInt(lowerStockSlider.value);
  upperStockVal = parseInt(upperStockSlider.value);
  filters.stockFrom =
    Number(lowerStockSlider.value) || productList.getMinStock();
  redrawProducts();
  minStockLabel.textContent = String(lowerStockVal);
  maxStockLabel.textContent = String(upperStockVal);

  if (lowerStockVal > upperStockVal - 4) {
    upperStockSlider.value = String(lowerStockVal + 4);

    if (upperStockVal === Number(upperStockSlider.max)) {
      lowerStockSlider.value = String(parseInt(upperStockSlider.max) - 4);
    }
  }
};

lowerStockSlider.min = String(productList.getMinStock());
lowerStockSlider.max = String(productList.getMaxStock());
upperStockSlider.min = String(productList.getMinStock());
upperStockSlider.max = String(productList.getMaxStock());

if (smallVBtn) {
  smallVBtn.setAttribute("src", smallViewBtn);
}

smallVBtn.addEventListener("click", changeDisplayMode);

const hugeVBtn = <HTMLImageElement>document.querySelector(".huge-v");

if (hugeVBtn) {
  hugeVBtn.setAttribute("src", hugeViewBtn);
}

hugeVBtn.addEventListener("click", changeDisplayMode);

function changeDisplayMode(): void {
  if (hugeVBtn.classList.contains("active-mode")) {
    hugeVBtn.classList.remove("active-mode");
    smallVBtn.classList.add("active-mode");
  } else {
    hugeVBtn.classList.add("active-mode");
    smallVBtn.classList.remove("active-mode");
  }
}

const logoSchool = <HTMLImageElement>document.querySelector(".logo");

if (logoSchool) {
  logoSchool.setAttribute("src", logo);
}

const iconGit1 = <HTMLImageElement>document.querySelector(".github-icon1");
const iconGit2 = <HTMLImageElement>document.querySelector(".github-icon2");

if (iconGit1 && iconGit2) {
  iconGit1.setAttribute("src", icon);
  iconGit2.setAttribute("src", icon);
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
        categoryInput.checked = filters.isCategoryChecked(`${filteredElem[i]}`);
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
        categoryInput.checked = filters.isBrandChecked(`${filteredElem[i]}`);
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

//Filtration

const searchInput = <HTMLInputElement>document.querySelector(".search-product");
searchInput.addEventListener("input", onSearchInputChange);

function onSearchInputChange() {
  filters.searchInput = searchInput.value;
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

      a.setAttribute("id", `item-${i}`);
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

const select = <HTMLSelectElement>document.getElementById("sort");

select.addEventListener("click", setSortOption);

function setSortOption() {
  filters.sortOptionValues = select.options[select.selectedIndex].value;
  redrawProducts();
}

function redrawProducts(): void {
  const productsStats = <HTMLElement>document.querySelector(".stat");

  const list = productList.filterProducts(
    filters.getCheckedCategories(),
    filters.getCheckedBrands(),
    filters.searchInput,
    filters.priceFrom,
    filters.priceTo,
    filters.stockFrom,
    filters.stockTo,
    filters.sortOptionValues.split("-")[0],
    filters.sortOptionValues.split("-")[1]
  );

  drawProducts(list.products);

  productsStats.textContent = `Found: ${list.products.length}`;

  updateUrl();

  redrawAddRemoveCartBtn();
}

function redrawAddRemoveCartBtn() {
  const btnAddCart: NodeListOf<Element> = document.querySelectorAll(
    ".btn-add-cart"
  );
  btnAddCart.forEach((elem) => {
    if (cart.cartProducts.has(Number(elem.id.slice(4)))) {
      elem.setAttribute("style", "display: none;");
    }
  });

  const btnRemoveCart: NodeListOf<Element> = document.querySelectorAll(
    ".btn-drop-cart"
  );
  btnRemoveCart.forEach((elem) => {
    if (cart.cartProducts.has(Number(elem.id.slice(5)))) {
      elem.setAttribute("style", "display: block;");
    }
  });
}

function redrawFilters() {
  const removedFilterElements: NodeListOf<Element> = document.querySelectorAll(
    ".checkbox-line"
  );
  removedFilterElements.forEach((elem) => elem.remove());
  createBrandFilter(productList.getAllBrands());
  createCategoryFilter(productList.getAllCategories());

  searchInput.value = filters.searchInput;
}

const btnResetFilters = <HTMLButtonElement>document.querySelector(".btn-reset");
btnResetFilters.addEventListener("click", resetFilters);

function resetFilters() {
  filters = new Filters(
    productList.getAllCategories(),
    productList.getAllBrands(),
    productList.getMinPrice(),
    productList.getMaxPrice(),
    productList.getMinStock(),
    productList.getMaxStock(),
    "",
    ""
  );

  redrawProducts();
  redrawFilters();
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
  refreshCountProductsCart();

  const productBigItem = <HTMLElement>(
    document.getElementById(`item-${productId - 1}`)
  );
  productBigItem.classList.add("in-cart");

  refreshProductsPrice();
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
  refreshCountProductsCart();

  const productBigItem = <HTMLElement>(
    document.getElementById(`item-${productId - 1}`)
  );
  productBigItem.classList.remove("in-cart");

  refreshProductsPrice();
}

function refreshCountProductsCart(): void {
  const amountProductsCart = <HTMLElement>(
    document.querySelector(".product-count")
  );
  amountProductsCart.textContent = `${cart.getProductsCount()}`;
}

function refreshProductsPrice() {
  const cartPrice = <HTMLElement>document.querySelector(".cart-price");
  cartPrice.textContent = `${cart.getProductsTotalPrice()}`;
}

function updateUrl() {
  const url = new URL(window.location.href);
  const checkedCategories = filters.getCheckedCategories();
  const checkedBrands = filters.getCheckedBrands();
  const searchInputValue = filters.searchInput;
  const minPrice = filters.priceFrom;
  const maxPrice = filters.priceTo;
  const price = [minPrice, maxPrice];
  const stockFrom = filters.stockFrom;
  const stockTo = filters.stockTo;
  const stock = [stockFrom, stockTo];
  const sortOptionValues = filters.sortOptionValues;

  checkedCategories.length
    ? url.searchParams.set("category", checkedCategories.join("↕"))
    : url.searchParams.delete("category");

  checkedBrands.length
    ? url.searchParams.set("brand", checkedBrands.join("↕"))
    : url.searchParams.delete("brand");

  minPrice || maxPrice
    ? url.searchParams.set("price", price.join("↕"))
    : url.searchParams.delete("price");

  stockFrom || stockTo
    ? url.searchParams.set("stock", stock.join("↕"))
    : url.searchParams.delete("stock");

  searchInputValue
    ? url.searchParams.set("search", searchInputValue)
    : url.searchParams.delete("search");

  sortOptionValues
    ? url.searchParams.set("sort", sortOptionValues)
    : url.searchParams.delete("sort");

  // Update the current URL
  window.history.replaceState(null, "", url);
}

function copyToClipboard() {
  const currentUrl = (<Window>window).location.href;

  // Copy the text inside the text field
  navigator.clipboard.writeText(currentUrl);
}

const copyBtn = <HTMLButtonElement>document.querySelector(".btn-copy");
copyBtn.addEventListener("click", onCopyBtnClick);

function onCopyBtnClick() {
  copyBtn.setAttribute("style", "display: none;");
  const copiedBtn = <HTMLButtonElement>document.querySelector(".btn-copied");
  copiedBtn.setAttribute("style", "display: block;");
  setTimeout(() => {
    copiedBtn.setAttribute("style", "display: none;");
    copyBtn.setAttribute("style", "display: block;");
  }, 500);
  copyToClipboard();
}

redrawProducts();

redrawFilters();

refreshCountProductsCart();

refreshProductsPrice();
