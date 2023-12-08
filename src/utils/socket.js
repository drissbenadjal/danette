import { io } from 'socket.io-client';

export const socket = io("https://danettenuitinfo.alwaysdata.net", {
    autoConnect: false,
});

socket.onAny((event, ...args) => {
    console.log("event received", event, args);
});