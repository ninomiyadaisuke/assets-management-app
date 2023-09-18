import { PubSub } from "@google-cloud/pubsub";
import { Server as HttpServer } from "http";
import { Server as NetServer, Socket } from "net";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const pubsub = new PubSub();
const subscriptionName = "updated-jastocks-sub";
let io: ServerIO | null = null;

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!io) {
    // console.log("Initializing ServerIO...");

    const httpServer: HttpServer = res.socket.server as any;
    io = new ServerIO(httpServer, {
      path: "/api/io",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    res.socket.server.io = io;
    // console.log("ServerIO initialized!");

    io.on("connection", (clientSocket) => {
      // console.log("A client has connected to ServerIO!");
      if (io) {
        io.emit("update", "test");
      }
      clientSocket.on("disconnect", (reason) => {
        // console.log("A client has disconnected:", reason);
      });
    });
    io.on("error", (error) => {
      // console.error("Socket.IO error:", error);
    });
  }
  io.on("error", (error) => {
    // console.error("Socket.IO error:", error);
  });
  const messageHandler = (message: any) => {
    const messageData = `Data: ${message.data.toString()}`;
    // console.log("Emitting update event with message:", messageData);
    if (io) {
      io.emit("update", messageData);
    }
    message.ack();
  };

  const subscription = pubsub.subscription(subscriptionName);
  subscription.on("message", messageHandler);
  res.end();
};

export default ioHandler;
