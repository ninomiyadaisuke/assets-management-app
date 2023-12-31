import { useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

import { url } from "@/services/client/url";
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [value, setValue] = useState("");
  // eslint-disable-next-line no-console
  console.log("test");
  useEffect(() => {
    const socketInstance = new (ClientIO as any)(`${url}`, {
      path: "/api/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("connect_error", (error: any) => {
      const test = "";
    });

    socketInstance.on("disconnect", (reason: any) => {
      const test = "";
    });

    socketInstance.on("update", (msg: any) => {
      // eslint-disable-next-line no-console
      console.log("message====>>>>", msg);
      setValue(msg);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return {
    value,
    isConnected,
  };
};
