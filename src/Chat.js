import React, { useState, useEffect } from 'react';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState('light'); // or 'dark'

  // Load chat history from local storage on component mount
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    setMessages(savedMessages);
  }, []);

  // Save chat history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.preventDefault()
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = {
      text: input,
      user: 'user', // You can add user or bot distinction
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

  const toggleTheme = (event) => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log(event.target.theme)
  };

  return (
    <div className={`h-screen w-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
    <div className={"container rounded-sm mx-auto py-4 "}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Chatbot</h1>
        <button className="px-2 py-1 text-sm" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>

      <div className="border p-4 rounded-lg shadow-lg">
        <div className="mb-4 max-h-60 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.user === 'user' ? 'text-right' : 'text-left'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form>
          <div className="flex">
            <input
              type="text submit"
              className="flex-1 border rounded-full p-2 outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
            />
            <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Chat;
