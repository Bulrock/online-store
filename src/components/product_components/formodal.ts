export function converteString(str: string): string[] {
  return str
    .trim()
    .split(" ")
    .filter((item) => item !== "");
}

export function lengthWordsInput(arr: string[], a: number): boolean {
  return arr.every((item) => item.length >= a);
}
