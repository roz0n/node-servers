const net = require("net");
const os = require("os");

function getLocalIP() {
  const interfaces = os.networkInterfaces();

  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === "IPv4" && !config.internal) {
        return config.address;
      }
    }
  }

  return "0.0.0.0";
}

const server = net.createServer((socket) => {
  // Client address and port
  const clientAddress = socket.remoteAddress;
  const clientPort = socket.remotePort;

  console.log(`Client connected: ${clientAddress}:${clientPort}`);

  socket.on("data", (data) => {
    console.log("Data received from client:", data.toString());

    socket.write("This is a generic response from the TCP server!", (error) => {
      if (error) {
        console.log("Error sending data:", error);
      }
    });
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

server.on("listening", () => {
  const address = server.address();

  console.log(`TCP Server bound to ${address.address}:${address.port}`);
  console.log(`Likely local IP for clients: ${getLocalIP()}:${address.port}`);
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`TCP Server is starting on port ${PORT}`);
});
