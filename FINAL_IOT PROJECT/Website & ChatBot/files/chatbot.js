// src/components/chatbot.js
import React, { useState } from "react";
import "./chatbot.css";

function ChatBot({ currentUser, activityHistory }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!currentUser) {
      addMessage("Bot", "Please login first!");
      return;
    }

    const userMessage = input.trim();
    if (!userMessage) return;
    addMessage(currentUser.email, userMessage);

    let botReply = "I didn't understand that.";

    // استعلام آخر 5 أحداث
    if (/last 5 events/i.test(userMessage) || /recent activity/i.test(userMessage)) {
      const last5 = activityHistory.slice(-5).reverse(); // آخر 5 أحداث
      if (last5.length === 0) {
        botReply = "No activity recorded yet.";
      } else {
        botReply = last5
          .map(a => `${a.email} - ${a.action.replace("_", " ")} at ${a.time}`)
          .join("\n");
      }
    } else if (/safe status/i.test(userMessage)) {
      const lastDoor = activityHistory.filter(a => a.action === "door_open" || a.action === "door_close").slice(-1)[0];
      botReply = lastDoor ? `Safe is currently ${lastDoor.action === "door_open" ? "open" : "closed"}` : "Safe status unknown.";
    }

    addMessage("Bot", botReply);
    setInput("");
  };

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  return (
    <div className="chatbot-container">
      <h3>Chat Bot</h3>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender === "Bot" ? "bot" : "user"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        placeholder="Ask something..."
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatBot;
