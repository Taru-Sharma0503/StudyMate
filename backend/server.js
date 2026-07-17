require("dotenv").config();
const net = require("net");

const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

console.log("=== Testing SMTP TCP connection ===");

const socket = net.connect({
  host: "smtp.gmail.com",
  port: 587,
  family: 4,
});

socket.setTimeout(8000);

socket.on("connect", () => {
  console.log("✅ TCP CONNECTED to smtp.gmail.com:587");
  socket.destroy();
});

socket.on("timeout", () => {
  console.log("❌ TCP TIMEOUT");
  socket.destroy();
});

socket.on("error", (err) => {
  console.log("❌ TCP ERROR:", err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});