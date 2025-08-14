const chatForm = document.getElementById("chat-form");
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Append a message to the chat box
function appendMessage(sender, message) {
  const messageEl = document.createElement("div");
  messageEl.classList.add("chat-message");

  if (sender === "user") {
    messageEl.classList.add("user-message");
  } else if (sender === "gpt") {
    messageEl.classList.add("gpt-message");
  } else if (sender === "info") {
    messageEl.classList.add("info-message");
  } else
    messageEl.classList.add("default-message");

  messageEl.textContent = message;
  chatBox.appendChild(messageEl);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function typeGPTMessage(message) {
  const messageEl = document.createElement("div");
  messageEl.classList.add("chat-message", "gpt-message");
  chatBox.appendChild(messageEl);

  for (let i = 0; i < message.length; i++) {
    messageEl.textContent += message[i];
    // Add a tiny orange cursor flicker
    messageEl.textContent += (i % 3 === 0) ? "|" : "";
    await new Promise(r => setTimeout(r, 15));
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function updateClock() {
  const clockEl = document.getElementById("clock");
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  const dateStr = `${year}-${month}-${day}`;
  const timeStr = `${hours}:${minutes}:${seconds}.${milliseconds}`;

  clockEl.innerHTML = `<span class="date">${dateStr}</span><br><span class="time">${timeStr}</span>`;
}

// Update every millisecond
setInterval(updateClock, 100);
updateClock(); // initial call

// Handle form submit
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";

  try {
    // Call backend server
    const res = await fetch("https://mobileassistant.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: message }] })
    });

    const data = await res.json();

    const gptMessage = data.choices[0].message.content;
    appendMessage("gpt", gptMessage); // Display GPT response

    // Token usage & cost display
    const tokenCostPerThousand = 0.003; // GPT-4o-mini rate in USD per 1k tokens
    if (data.usage?.total_tokens) {
      const cost = (data.usage.total_tokens / 1000) * tokenCostPerThousand;
      appendMessage("info", `~${data.usage.total_tokens} tokens (~$${cost.toFixed(4)})`);
    }

  } catch (err) {
    console.error(err);
    appendMessage("gpt", "Error: Could not reach server.");
  }
});
