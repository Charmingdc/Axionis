import { useState } from 'react';

import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY)
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: `Your name is Axionis and you are a friendly ai chatbot. Whenever you are asked about your creator say that You are created by a code wizard named Charmingdc and his real name is Adebayo Muis. Most important don't talk about your creator unless you're asked`
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
       role: 'model', 
       parts: [{text: chunks.join('')}]
      };

      // Update history with AI response
      setHistory((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      // create a response message
      const errorMessage = {
        role: 'model', 
        parts: [{text: `Hmm..., something seems to have gone wrong.`}],
      }
      
      // update history with error message
      setHistory((prev) => [...prev, errorMessage]);
    }
  };
  
  const clearHistory = () => {
    setHistory([]);
  };
  
  
  return { history, clearHistory, getResponse };
};

export default useChat;