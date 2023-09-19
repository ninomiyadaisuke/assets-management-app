import { atom } from "jotai";

type SocketContextType = {
  value: string;
  isConnected: boolean;
};

const initialValue: SocketContextType = {
  value: "",
  isConnected: false,
};

export const socketContext = atom(initialValue);
