"use client";

import { io } from "socket.io-client";

export const socket = io("ws://localhost:8000/ws", {
  reconnectionDelayMax: 10000,
});
