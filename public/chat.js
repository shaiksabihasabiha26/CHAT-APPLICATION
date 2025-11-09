// --- Connecting to the backend server ---
// 'io()' automatically connects to the same origin (http://localhost:5000 if running locally)
const socket = io();

// --- Getting references to HTML elements ---
const messages = document.getElementById("messages");       // Chat message display area
const input = document.getElementById("messageInput");       // Message input box
const sendBtn = document.getElementById("sendBtn");          // Send button
const usernameInput = document.getElementById("username");   // Username input box

// --- Sending a chat message when the send button is clicked ---
sendBtn.addEventListener("click", () => {
  const msg = input.value.trim();                            // Get text from input, remove spaces
  const user = usernameInput.value.trim() || "Anonymous";    // If username empty, use 'Anonymous'

  // Only send message if not empty
  if (msg) {
    // Emit the message to the server
    socket.emit("chatMessage", { user, msg });

    // Clear the input box after sending
    input.value = "";
  }
});

// --- Receiving a chat message from the server ---
socket.on("chatMessage", (data) => {
  // Create a new <div> for each incoming message
  const div = document.createElement("div");

  // Format: "Username: message"
  div.textContent = `${data.user}: ${data.msg}`;

  // Add the message to the chat area
  messages.appendChild(div);

  // Automatically scroll to the latest message
  messages.scrollTop = messages.scrollHeight;
});
