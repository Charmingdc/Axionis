import { useState } from 'react';

import { GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai';

const APIKEY: string = import.meta.env.VITE_API_KEY;

const genAI = new GoogleGenerativeAI(APIKEY)
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});


const useChat = () => {
  const [history, setHistory] = useState <{role: string; parts: {text: string}[] } []>([]);

  const getResponse = async (prompt: string) => {
    try {
      // Start a new chat with the current history
      const chat = model.startChat({ history });

      // Send user message
      const userMessage = { 
       role: 'user',
       parts: [{text: prompt }]
      };
      const updatedHistory = [...history, userMessage];

      // Update history state
      setHistory(updatedHistory);

      // Get AI response
      const response = await chat.send({ prompt });
      const aiMessage = { 
       role: 'assistant', 
       parts: [{text: response.text}]
      };

      // Update history with AI response
      setHistory((prev) => [...prev, aiMessage]);

      return response.text;
    } catch (err) {
      // create a response message
      const errorMessage = {
        role: 'assistant', 
        parts: [{text: 'Something went wrong, try again'}],
      }
      
      // update history with error message
      setHistory((prev) => [...prev, errorMessage]);
    }
  };

  return { history, getResponse };
};

export default useChat;