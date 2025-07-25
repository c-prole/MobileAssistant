// Import the secret API key from the separate file
import { OPENAI_API_KEY } from './secret.js';

// Get DOM elements
const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');

// Event listener for form submission
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent form from refreshing the page

    const userInput = document.getElementById('user-input').value;

      // Display user's message in the chat box
        chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

          try {
              // Send request to OpenAI API
                  const response = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                              headers: {
                                      'Content-Type': 'application/json',
                                              'Authorization': `Bearer ${OPENAI_API_KEY}`
                                                    },
                                                          body: JSON.stringify({
                                                                  model: 'gpt-3.5-turbo',
                                                                          messages: [
                                                                                    { role: 'system', content: 'You are a helpful assistant.' },
                                                                                              { role: 'user', content: userInput }
                                                                                                      ],
                                                                                                              temperature: 0.7
                                                                                                                    })
                                                                                                                        });

                                                                                                                            const data = await response.json();

                                                                                                                                // Extract and display assistant's reply
                                                                                                                                    const reply = data.choices?.[0]?.message?.content || '[No response]';
                                                                                                                                        chatBox.innerHTML += `<p><strong>Assistant:</strong> ${reply}</p>`;

                                                                                                                                          } catch (error) {
                                                                                                                                              // Handle errors and display in chat box
                                                                                                                                                  chatBox.innerHTML += `<p><strong>Assistant:</strong> Error: ${error.message}</p>`;
                                                                                                                                                    }

                                                                                                                                                      // Clear the input box
                                                                                                                                                        chatForm.reset();
                                                                                                                                                        });