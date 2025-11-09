// --- Import required modules ---
const express = require("express");     // Web framework to handle routes & serve files
const http = require("http");           // Native HTTP module (needed to attach socket.io)
const { Server } = require("socket.io"); // Socket.IO for real-time communication
const cors = require("cors");           // Allows frontend from other origins to connect

// --- Create Express app and HTTP server ---
const app = express();                  // Initialize Express application
const server = http.createServer(app);  // Create HTTP server
const io = new Server(server);          // Attach Socket.IO to the server

// --- Middleware configuration ---
app.use(cors());                        // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.static("public"));      // Serve static files from 'public' folder (HTML, CSS, JS)

// --- Handle client connections via Socket.IO ---
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);  // Log when a user connects

  // --- Listen for incoming chat messages from clients ---
  socket.on("chatMessage", (data) => {
    // Broadcast message to all connected clients (including sender)
    io.emit("chatMessage", data);
  });

  // --- Handle user disconnect event ---
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);  // Log when a user disconnects
  });
});

// --- Start the server ---
const PORT = 3000;                      // Port number where the app will run
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`); // Log server URL
});
