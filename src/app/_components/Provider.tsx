"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  value: string;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  value: "",
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const socketInstance = new (ClientIO as any)("http://localhost:3000", {
      path: "/api/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      // console.log('connect');

      setIsConnected(true);
    });

    socketInstance.on("connect_error", (error: any) => {
      const test = "";
    });

    socketInstance.on("disconnect", (reason: any) => {
      const test = "";
    });

    socketInstance.on("update", (msg: any) => {
      setValue(msg);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ value, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
