import { atom } from "jotai";

export type AlertDialogState = {
  isShown: boolean;
  message: string;
  cancelButtonLabel: string;
  okButtonLabel: string;
};

export const initialState: AlertDialogState = {
  isShown: false,
  message: "",
  cancelButtonLabel: "いいえ",
  okButtonLabel: "はい",
};

export const alertDialogStateContext = atom<AlertDialogState>(initialState);
