async function callGPT(promptText) {
      const endpoint = "https://api.openai.com/v1/chat/completions";

        const response = await fetch(endpoint, {
            method: "POST",
                headers: {
                      "Content-Type": "application/json",
                            "Authorization": `Bearer ${OPENAI_API_KEY}`
                                },
                                    body: JSON.stringify({
                                          model: "gpt-3.5-turbo",
                                                messages: [{ role: "user", content: promptText }],
                                                      max_tokens: 100,
                                                            temperature: 0.5
                                                                })
                                                                  });

                                                                    const data = await response.json();
                                                                      return data.choices?.[0]?.message?.content || "No response.";
                                                                      }