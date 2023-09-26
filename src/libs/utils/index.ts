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

export const formatDate = (inputStr: Date) => {
  const dateObj = new Date(inputStr);

  // タイムゾーンを調整します（UTC+9）
  const adjustedDate = new Date(dateObj.getTime() + 9 * 60 * 60 * 1000);

  const year = adjustedDate.getUTCFullYear();
  const month = String(adjustedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(adjustedDate.getUTCDate()).padStart(2, "0");
  const hours = String(adjustedDate.getUTCHours()).padStart(2, "0");
  const minutes = String(adjustedDate.getUTCMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};
