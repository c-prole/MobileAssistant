const chatForm = document.getElementById("chat-form");
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Append a message to the chat box
function appendMessage(sender, message) {
  const messageEl = document.createElement("div");
  messageEl.classList.add("message");
  messageEl.classList.add(sender);
  messageEl.textContent = `${sender}: ${message}`;
  chatBox.appendChild(messageEl);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle form submit
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  userInput.value = "";

  try {
    // Call backend server
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: message }] })
    });

    const data = await res.json();
    const gptMessage = data.choices?.[0]?.message?.content || "No response";

    appendMessage("GPT", gptMessage);

  } catch (err) {
    console.error(err);
    appendMessage("GPT", "Error: Could not reach server.");
  }
});