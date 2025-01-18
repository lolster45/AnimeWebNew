const cors = require('cors'); // Import CORS
const express = require('express'); // Import Express-like middleware
const { json } = require('micro'); // Parse JSON (used for serverless)

const getAiResponse = require('./utils/openAIService'); // Adjust path as needed

// Vercel's serverless function handler
const handler = async (req, res) => {
  // CORS configuration
  const corsMiddleware = cors({ origin: '*' });
  await new Promise((resolve, reject) => corsMiddleware(req, res, (err) => (err ? reject(err) : resolve())));

  // Parse the request body
  const { prompt } = await json(req);

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
};

module.exports = handler;
