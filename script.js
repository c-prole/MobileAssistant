import { OPENAI_API_KEY } from './secret.js';

const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

    const userMessage = input.value.trim();
      if (!userMessage) return;

        // Display user message
          appendMessage("You", userMessage);
            input.value = "";

              try {
                  const response = await fetch("https://api.openai.com/v1/chat/completions", {
                        method: "POST",
                              headers: {
                                      "Content-Type": "application/json",
                                              Authorization: `Bearer ${OPENAI_API_KEY}`,
                                                    },
                                                          body: JSON.stringify({
                                                                  model: "gpt-3.5-turbo",
                                                                          messages: [{ role: "user", content: userMessage }],
                                                                                }),
                                                                                    });

                                                                                        if (!response.ok) {
                                                                                              throw new Error(`OpenAI API error: ${response.status}`);
                                                                                                  }

                                                                                                      const data = await response.json();
                                                                                                          const reply = data.choices[0].message.content.trim();
                                                                                                              appendMessage("GPT", reply);
                                                                                                                } catch (error) {
                                                                                                                    console.error("Error:", error);
                                                                                                                        appendMessage("GPT", "Sorry, something went wrong.");
                                                                                                                          }
                                                                                                                          });

                                                                                                                          function appendMessage(sender, message) {
                                                                                                                            const msg = document.createElement("p");
                                                                                                                              msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
                                                                                                                                chatBox.appendChild(msg);
                                                                                                                                  chatBox.scrollTop = chatBox.scrollHeight;
                                                                                                                                  form.addEventListener("submit", (e) => {
                                                                                                                                      e.preventDefault();
                                                                                                                                        console.log("Form submitted");
                                                                                                                                        });
                                                                                                                                  }