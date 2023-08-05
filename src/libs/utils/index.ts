export const convertToNumber = (value: string): number => {
  const noCommas = value.replace(/,/g, "");
  return Number(noCommas);
};
