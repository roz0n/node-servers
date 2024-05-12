const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    console.log("Data received from client:", data.toString());
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

const PORT = 8088;

server.listen(PORT, () => {
  console.log(`TCP Server is running on port ${PORT}`);
});
