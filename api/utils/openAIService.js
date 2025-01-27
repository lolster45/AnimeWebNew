import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Use node-fetch for HTTP requests

dotenv.config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_BASE_URL = process.env.HUGGINGFACE_BASE_URL;

const getAiResponse = async (prompt) => {
  try {
    const response = await fetch(HUGGINGFACE_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data[0].generated_text; // Return the generated text
  } 
  catch (error) {
    console.error("Error communicating with Hugging Face API:", error);
    throw error;
  }
};

export default getAiResponse;