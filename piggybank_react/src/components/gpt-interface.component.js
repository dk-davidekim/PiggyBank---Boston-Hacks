import React from 'react';
import Chatbot from 'react-chatbot-kit'; // Assuming you're using a chatbot package

const ChatGPTInterface = ({ onSendMessage }) => {
  return (
    <div className="chat-interface">
      <Chatbot /* Chatbot configuration here */ sendMessage={onSendMessage} />
    </div>
  );
};

export default ChatGPTInterface; // This line exports the component as the default export
