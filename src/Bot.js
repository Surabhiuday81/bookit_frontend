// Chatbot.js
import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Prevent script from being injected multiple times
    if (!document.getElementById('dialogflow-messenger')) {
      const script = document.createElement('script');
      script.id = 'dialogflow-messenger';
      script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="Events-Search"
      agent-id="548a600c-b149-41e8-b814-6b0e6b0c6411"
      language-code="en"
    ></df-messenger>
  );
};

export default Chatbot;