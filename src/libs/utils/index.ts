import { colors } from "../colors";

export const convertToNumber = (value: string): number => {
  const noCommas = value.replace(/,/g, "");
  return Number(noCommas);
};

export const returnThemePlusOrMinus = (number: number) => {
  return Math.sign(number) === 1 ? "plus" : "minus";
};

export const extractColorsUpToIndex = (index: number) => {
  return colors.slice(0, index);
};
