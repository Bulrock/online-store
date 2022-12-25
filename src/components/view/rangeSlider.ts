export default class RangeSlider {
  lowerSlider: HTMLInputElement;
  upperSlider: HTMLInputElement;
  minPriceLabel: HTMLLabelElement;
  maxPriceLabel: HTMLLabelElement;
  formatValue: (value: number) => string;

  constructor(
    lowerSlider: HTMLInputElement,
    upperSlider: HTMLInputElement,
    minPriceLabel: HTMLLabelElement,
    maxPriceLabel: HTMLLabelElement,
    formatValue: (value: number) => string
  ) {
    this.lowerSlider = lowerSlider;
    this.upperSlider = upperSlider;
    this.minPriceLabel = minPriceLabel;
    this.maxPriceLabel = maxPriceLabel;
    this.formatValue = formatValue;
  }

  static create(
    lowerSliderId: string,
    upperSliderId: string,
    lowerLabelId: string,
    upperLabelId: string,
    minValue: number,
    maxValue: number,
    onValueChange: (minValue: number, maxValue: number) => void,
    formatValue: (value: number) => string
  ): RangeSlider {
    const lowerSlider = <HTMLInputElement>(
        document.getElementById(lowerSliderId)
      ),
      upperSlider = <HTMLInputElement>document.getElementById(upperSliderId);
    let lowerVal = parseInt(lowerSlider.value),
      upperVal = parseInt(upperSlider.value);

    const minPriceLabel = <HTMLLabelElement>(
      document.getElementById(lowerLabelId)
    );

    const maxPriceLabel = <HTMLLabelElement>(
      document.getElementById(upperLabelId)
    );

    upperSlider.oninput = function () {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);
      onValueChange(lowerVal, upperVal);
      minPriceLabel.textContent = formatValue(lowerVal);
      maxPriceLabel.textContent = formatValue(upperVal);

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
      onValueChange(lowerVal, upperVal);
      minPriceLabel.textContent = formatValue(lowerVal);
      maxPriceLabel.textContent = formatValue(upperVal);

      if (lowerVal > upperVal - 4) {
        upperSlider.value = String(lowerVal + 4);

        if (upperVal === Number(upperSlider.max)) {
          lowerSlider.value = String(parseInt(upperSlider.max) - 4);
        }
      }
    };

    lowerSlider.min = String(minValue);
    lowerSlider.max = String(maxValue);
    upperSlider.min = String(minValue);
    upperSlider.max = String(maxValue);

    return new RangeSlider(
      lowerSlider,
      upperSlider,
      minPriceLabel,
      maxPriceLabel,
      formatValue
    );
  }

  setMinValue(minValue: number): void {
    this.lowerSlider.value = String(minValue);
    this.minPriceLabel.textContent = this.formatValue(minValue);
  }

  setMaxValue(maxValue: number): void {
    this.upperSlider.value = String(maxValue);
    this.maxPriceLabel.textContent = this.formatValue(maxValue);
  }
}
