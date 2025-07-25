function handleInput() {
      const input = document.getElementById("userInput").value;
        const responseBox = document.getElementById("response");

          if (input.trim() === "") {
              responseBox.innerHTML = "<em>Please enter something.</em>";
                  return;
                    }

                      // Simulated response
                        responseBox.innerHTML = `<strong>You said:</strong> ${input}<br/><br/><strong>Assistant:</strong> I'm thinking... 🤖`;

                          // In the future, this will call GPT!
                            setTimeout(() => {
                                responseBox.innerHTML = `<strong>You said:</strong> ${input}<br/><br/><strong>Assistant:</strong> I'm just a placeholder for now, but soon I’ll be smart.`;
                                  }, 1000);
                                  }
