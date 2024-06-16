import { useState, useEffect, useRef } from 'react';
import socketIO from 'socket.io-client'; // Install socket.io-client package for WebSocket support
import { FETCH, ROUTES } from '../api/fetch';
import { getUserData } from '../utils';

const ChatComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref to the end of messages container
  useEffect(() => {
    fetchMessages();

    const socketc = socketIO.connect(import.meta.env.VITE_BASE_API_URL_DEV);
    setSocket(socketc);

    return () => {
      if (socket) socket.off('message');
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const fetchMessages = async () => {
    try {
      const response = await FETCH.get({ url: ROUTES.MESSAGES });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const user = getUserData();
    if (!user) return;
    try {
      const { id, username } = user;
      const params = {
        userId: id,
        username,
        content: newMessage,
      };
      socket.emit('message', params);

      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-78vh flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
          <div
          key={index}
          className={`flex items-center space-x-2 ${
            message.userid == getUserData().id ? 'bg-blue-100 rounded-lg p-2 justify-end' : 'justify-start' // Highlight logged-in user's messages
          }`}
        >              <div className="font-semibold">{message.username}:</div>
              <div>{message.content}</div>
            </div>
          ))}
          {/* Ref to scroll to bottom */}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSendMessage} className="flex p-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded-lg p-2 mr-2 border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
