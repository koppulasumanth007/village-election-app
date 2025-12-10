// import { io } from "socket.io-client";

// const socket = io("http://localhost:5001", {
//   transports: ["websocket", "polling"],
// });

// export default socket;


import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5001", {
  transports: ["websocket"],
});

export default socket;
