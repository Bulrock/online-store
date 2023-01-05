import {
  lengthWordsInput,
  converteString,
} from "../../../src/components/product_components/formodal";

describe("lengthWordsInput function:", () => {
  test("should return true if the length of each word in the array is greater than or equal to a", () => {
    const arr: string[] = ["asfsdfsdf", "dkh32bd23", "dh23gfi23gf", "slawa"];
    const arr2: string[] = ["asfsdfsdf", "sdfsdfsdfdf", "dh23gfi23gf", "tom"];
    expect(lengthWordsInput(arr, 5)).toBe(true);
    expect(lengthWordsInput(arr2, 4)).toBe(false);
    expect(lengthWordsInput(arr2, 3)).toBe(true);
  });
});

describe("converteString function:", () => {
  test("should return array string", () => {
    expect(converteString("    sdfhs sjkfsjf  ")).toEqual(["sdfhs", "sjkfsjf"]);
    expect(converteString("    sdfhs    slawa    sjkfsjf  ")).toEqual([
      "sdfhs",
      "slawa",
      "sjkfsjf",
    ]);
  });
});
