import express from 'express';
import cors from 'cors';
import getAiResponse from './utils/openAIService.js';

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Handler
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const aiResponse = await getAiResponse(prompt); // Call your service function
    return res.status(200).json({ response: aiResponse });
  } 
  catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Export the app for Vercel
export default app;