export default class Filters {
  categories: Map<string, boolean>;
  brands: Map<string, boolean>;
  priceFrom: number | undefined = 0;
  priceTo: number | undefined = Number.MAX_VALUE;
  stockFrom: number | undefined = 0;
  stockTo: number | undefined = Number.MAX_VALUE;
  searchInput = "";
  sortOptionValues = "";

  constructor(
    categories: string[],
    brands: string[],
    priceFrom: number | undefined,
    priceTo: number | undefined,
    stockFrom: number | undefined,
    stockTo: number | undefined,
    searchInput: string,
    sortOptionValues: string
  ) {
    this.categories = categories.reduce((prev, current) => {
      prev.set(current, false);
      return prev;
    }, new Map<string, boolean>());

    this.brands = brands.reduce((prev, current) => {
      prev.set(current, false);
      return prev;
    }, new Map<string, boolean>());

    this.priceFrom = priceFrom;
    this.priceTo = priceTo;
    this.stockFrom = stockFrom;
    this.stockTo = stockTo;
    this.searchInput = searchInput;
    this.sortOptionValues = sortOptionValues;
  }

  changeCategoryFilter(category: string, isChecked: boolean) {
    this.categories.set(category, isChecked);
  }

  changeBrandFilter(brand: string, isChecked: boolean) {
    this.brands.set(brand, isChecked);
  }

  getCheckedCategories(): string[] {
    const checkedCategoriesArr: string[] = [];
    this.categories.forEach((value, key) => {
      if (value === true) checkedCategoriesArr.push(key);
    });
    return checkedCategoriesArr;
  }

  getCheckedBrands(): string[] {
    const checkedBrandsArr: string[] = [];
    this.brands.forEach((value, key) => {
      if (value === true) checkedBrandsArr.push(key);
    });
    return checkedBrandsArr;
  }

  setCheckedCategories(categories: string[]): void {
    categories.forEach((elem) => {
      this.categories.set(elem, true);
    });
  }

  setCheckedBrands(brands: string[]): void {
    brands.forEach((elem) => {
      this.brands.set(elem, true);
    });
  }

  isCategoryChecked(category: string): boolean {
    return this.categories.get(category) || false;
  }

  isBrandChecked(brand: string): boolean {
    return this.brands.get(brand) || false;
  }
}
