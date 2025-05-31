import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useContext } from "react";
import { forecastContext } from "../Context/forecast";
import { FaPaperPlane } from "react-icons/fa"; // Send button icon

const Chatbot = () => {
  const { Data } = useContext(forecastContext);
  console.log(Data);
  const [messages, setMessages] = useState([
    { text: "👋 Hi! Ask me about AQI, Weather, or Health (e.g., 'I have asthma').", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post("https://weatherpro-backend-1.onrender.com/api/chat", {
        message: input,
        weather: Data[0],
      });

      // Ensure the response is correctly extracted
      const botResponse = res.data || "I'm sorry, I couldn't understand that.";

      setTimeout(() => {
        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
        setIsTyping(false);
      }, 1200); // Simulate a short typing delay
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "⚠️ Oops! Something went wrong.", sender: "bot" }]);
      setIsTyping(false);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-5">
      {/* Chat Messages */}
      <div className="h-80 overflow-y-auto p-3 bg-white rounded-xl shadow-inner">
        {messages.map((msg, index) => (
          <div key={index} className={`flex my-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 max-w-xs rounded-lg text-white shadow-md 
              ${msg.sender === "bot" ? "bg-blue-400" : "bg-green-500 text-right"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-gray-500 text-sm my-2">🤖 Typing...</div>}
        <div ref={chatRef} />
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-2 mt-3">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me about AQI, Weather, or Health..."
        />
        <button 
          className="bg-blue-700 text-white p-3 rounded-full shadow-md hover:bg-blue-800 transition"
          onClick={handleSend}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
