const chatForm = document.getElementById("chat-form");
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Append a message to the chat box
function appendMessage(sender, message) {
  const messageEl = document.createElement("div");
  messageEl.classList.add("chat-message");

  // Add user vs GPT styling
  if (sender === "user") {
    messageEl.classList.add("user-message");
  } else {
    messageEl.classList.add("gpt-message");
  }

  messageEl.textContent = message; // keeps the message text
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
    const res = await fetch("https://mobileassistant.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: message }] })
    });

    const data = await res.json();
    const tokenCostPerThousand = 0.003; // GPT-4o-mini rate in USD per 1k tokens

    const gptMessage = data.choices[0].message.content;

    if (data.usage?.total_tokens) {
      const cost = (data.usage.total_tokens / 1000) * tokenCostPerThousand;
      appendMessage(`~${data.usage.total_tokens} tokens (~$${cost.toFixed(4)})`, "gpt");
    }

    appendMessage("GPT", gptMessage);

  } catch (err) {
    console.error(err);
    appendMessage("GPT", "Error: Could not reach server.");
  }
});