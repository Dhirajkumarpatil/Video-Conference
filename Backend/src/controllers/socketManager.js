import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join-call", (path) => {

      if (!connections[path]) {
        connections[path] = [];
      }

      // ✅ Send existing users to NEW user
      io.to(socket.id).emit("existing-users", connections[path]);

      // ✅ Add user
      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      // ✅ Notify others
      connections[path].forEach((id) => {
        if (id !== socket.id) {
          io.to(id).emit("user-joined", socket.id);
        }
      });
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);

      for (const [room, users] of Object.entries(connections)) {
        if (users.includes(socket.id)) {

          connections[room] = users.filter(id => id !== socket.id);

          // notify others
          connections[room].forEach((id) => {
            io.to(id).emit("user-left", socket.id);
          });

          if (connections[room].length === 0) {
            delete connections[room];
          }

          break;
        }
      }
    });
  });

  return io;
};

export default connectToSocket;