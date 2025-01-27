import dotenv from 'dotenv';
dotenv.config();

//Hugging face client...
import { HfInference } from '@huggingface/inference';
const client = new HfInference(process.env.HUGGINGFACE_API_KEY);


const getAiResponse = async (prompt) => {
  try {
    // const response = await fetch(HUGGINGFACE_BASE_URL, {

    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     inputs: prompt,
    //   }),
    // });

    const response = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-R1",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      provider: "hf-inference",
      max_tokens: 500,
    });

    const generatedText = response.choices[0]?.message?.content;

    if (!generatedText) {
      throw new Error('No response generated by the model.');
    }

    return generatedText;
  } 
  catch (error) {
    console.error("Error communicating with Hugging Face API:", error);
    throw error;
  }
};

export default getAiResponse;