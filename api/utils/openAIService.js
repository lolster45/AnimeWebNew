const OpenAI = require('openai')

const client = new OpenAI({
    //baseURL: "https://api-inference.huggingface.co/v1/",
    //apiKey: process.env.OPENAI_API_KEY,  // Use environment variables for your API key
    baseURL: process.env.HUGGINGFACE_BASE_URL,
    apiKey: process.env.HUGGINGFACE_API_KEY, 

});

// Function to get AI completion (response)
const getAiResponse = async (prompt) => {
    try {
      const completion = await client.chat.completions.create({
        model: "microsoft/DialoGPT-large", // or use "gpt-3.5" based on your need
        messages: [
          { role: "user", content: prompt },
        ],
        max_tokens: 500
      });
  
      return completion.choices[0].message.content; // Return the AI's message
    } 
    catch (error) {
      console.error("Error communicating with OpenAI API:", error);
      throw error; // Propagate the error if something goes wrong
    }
};

module.exports = getAiResponse

