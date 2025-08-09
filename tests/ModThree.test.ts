import { modThree } from "../src/ModThree";

describe("modThree", () => {
  test("returns 0 for strings that are multiples of 3", () => {
    expect(modThree("0")).toBe(0);
    expect(modThree("11")).toBe(0);    // binary 3 mod 3 = 0
    expect(modThree("11011")).toBe(0); // binary 27 mod 3 = 0
  });

  test("returns 1 for strings mod 3 with remainder 1", () => {
    expect(modThree("1")).toBe(1);
    expect(modThree("100")).toBe(1);   // binary 4 mod 3 = 1
    expect(modThree("10110")).toBe(1); // binary 22 mod 3 = 1
  });

  test("returns 2 for strings mod 3 with remainder 2", () => {
    expect(modThree("10")).toBe(2);
    expect(modThree("101")).toBe(2);     // binary 5 mod 3 = 2
    expect(modThree("1011100")).toBe(2); // binary 92 mod 3 = 2
  });

  test("throws an error on invalid string input", () => {
    expect(() => modThree("104")).toThrow();
    expect(() => modThree("xyz")).toThrow();
  });

  test("returns 0 for state S0 for an empty string", () => {
    expect(modThree("")).toBe(0); // final state S0 -> 0
  });
});
