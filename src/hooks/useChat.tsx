import { useState } from 'react';

import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY)
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
      const response = await chat.sendMessageStream(prompt);
      
      const chunks: string[] = [];
      for await (const chunk of response.stream) {
        const chunkText = chunk.text();
        chunks.push(chunkText);
      }
      
      const aiMessage = { 
       role: 'assistant', 
       parts: [{text: chunks.join('')}]
      };

      // Update history with AI response
      setHistory((prev) => [...prev, aiMessage]);

      return response.text;
    } catch (err) {
      // create a response message
      const errorMessage = {
        role: 'assistant', 
        parts: [{text: 'Sorry, something went wrong 😔'}],
      }
      
      // update history with error message
      setHistory((prev) => [...prev, errorMessage]);
    }
  };

  return { history, getResponse };
};

export default useChat;