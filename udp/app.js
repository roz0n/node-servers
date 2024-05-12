const dgram = require("dgram");
const os = require("os");
const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.log(`Server error:\n${err.stack}`);
  server.close();
});

server.on("message", (msg, rinfo) => {
  console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  console.log(`Byte length: ${msg.byteLength}`);
  console.log(msg);

  const responseMessage = Buffer.from(
    "This is an automated response from the UDP server."
  );
  server.send(responseMessage, rinfo.port, rinfo.address, (error) => {
    if (error) {
      console.error("Failed to send message", error);
    } else {
      console.log(`Sent response to ${rinfo.address}:${rinfo.port}`);
    }
  });
});

server.on("listening", () => {
  const address = server.address();

  console.log(`UDP Server bound to ${address.address}:${address.port}`);
  console.log(`Likely local IP for clients: ${getLocalIP()}:${address.port}`);
});

const PORT = 8001;
server.bind(PORT);
