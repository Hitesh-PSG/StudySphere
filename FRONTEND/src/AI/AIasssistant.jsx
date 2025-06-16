// src/AI/AIasssistant.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, X } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import AIMessage from './AIMessage';

// --- SETUP (Unchanged) ---
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const AIassistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', summary: "Hello! I'm your AI study assistant. Ask me anything about coding!", details: null },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // --- CHANGE: We no longer need to manage the chat session manually like this ---
  // const chatSession = useRef(null);
  // useEffect(() => {
  //   chatSession.current = model.startChat({ history: [] });
  // }, []);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]); // Also scroll when loading indicator appears/disappears

  // --- NEW LOGIC: This function is completely rewritten to support streaming ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const userMessageText = inputValue;
    const userMessage = { id: Date.now(), sender: 'user', text: userMessageText };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Create a placeholder for the AI's response immediately.
    const aiResponseId = Date.now() + 1;
    const aiResponsePlaceholder = { id: aiResponseId, sender: 'ai', summary: '', details: null };
    setMessages((prev) => [...prev, aiResponsePlaceholder]);

    try {
      const prompt = `IMPORTANT: Your response MUST be in two parts separated by '|||---|||'. Part 1: A single, concise summary paragraph. Part 2: The full, detailed answer in GitHub Flavored Markdown format. User's question: ${userMessageText}`;

      // Start the streaming chat session
      const chat = model.startChat({ history: [] });
      const result = await chat.sendMessageStream(prompt);

      let fullResponseText = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponseText += chunkText;

        // Update the placeholder message in real-time
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === aiResponseId) {
              const separator = '|||---|||';
              const [summary, details] = fullResponseText.includes(separator)
                ? fullResponseText.split(separator).map(s => s.trim())
                : [fullResponseText.trim(), null];
              
              return { ...msg, summary, details };
            }
            return msg;
          })
        );
      }

    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      // If an error occurs, update the placeholder to show the error.
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === aiResponseId) {
            return { ...msg, summary: "Sorry, I ran into an error.", details: `Details: ${error.message}` };
          }
          return msg;
        })
      );
    } finally {
      setIsLoading(false);
    }
  };


  return (
    // --- The rest of the component's JSX is completely unchanged. ---
    <div
      className={`
        fixed top-0 right-0 h-full z-50
        w-full sm:w-[440px]
        bg-slate-900 text-white shadow-2xl border-l border-slate-700
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="p-4 border-b border-slate-700 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2"><Sparkles className="text-yellow-400" /><h2 className="text-xl font-bold">AI Assistant</h2></div>
        <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
      </div>
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md rounded-2xl ${message.sender === 'user' ? 'bg-yellow-500 text-black px-4 py-2' : ''}`}>
              {message.sender === 'ai' 
                ? <AIMessage message={message} /> 
                : <p className="whitespace-pre-wrap">{message.text}</p>
              }
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 rounded-2xl p-2">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                </div>
              </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-slate-700 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask a coding question..." className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" disabled={isLoading}/>
          <button type="submit" className="bg-yellow-500 text-black p-2 rounded-lg hover:bg-yellow-400 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors" disabled={isLoading}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIassistant;