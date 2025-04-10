import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Send } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  isTyping?: boolean;
}

const ChatBox: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState('');
  const { theme } = useTheme();
  
  const initialMessage = theme === 'light' 
    ? "Jag är Amirs AI assistent, om du har några ytterligare frågor" 
    : "I am Amirs Assistant, do you have any further questions please feel free to ask me";
  
  const [messages, setMessages] = useState<Message[]>([
    { text: initialMessage, isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(30); // milliseconds per character

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.3, 0.8], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0.3, 0.8], [100, 0]);
  const backgroundOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 0.7]);

  // Update initial message when theme changes
  useEffect(() => {
    setMessages([{ text: initialMessage, isUser: false }]);
  }, [theme, initialMessage]);

  // Function to simulate typing effect
  const typeMessage = (fullText: string) => {
    let currentText = '';
    let currentIndex = 0;
    
    // Add a new message with empty text and isTyping flag
    setMessages(prev => [...prev, { text: '', isUser: false, isTyping: true }]);
    
    // Scroll to the bottom to show the typing indicator
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Create an interval to add characters one by one
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        currentIndex++;
        
        // Update the message with the current text
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            text: currentText, 
            isUser: false,
            isTyping: true
          };
          return newMessages;
        });
        
        // Scroll to the bottom as text is being typed
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // When typing is complete, remove the isTyping flag
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            text: fullText, 
            isUser: false,
            isTyping: false
          };
          return newMessages;
        });
        
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    
    return typingInterval;
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { text: inputText, isUser: true }]);
    setInputText('');
    setIsLoading(true);
    
    try {
      // Call the AI agent API
      const response = await fetch('https://h1g08si7e6.execute-api.eu-west-1.amazonaws.com/dev/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputText }),
      });
      
      const data = await response.json();
      const aiResponse = data.response || "I'm sorry, I couldn't process your question. Please try again.";
      
      // Use the typing effect for the AI response
      typeMessage(aiResponse);
    } catch (error) {
      console.error('Error calling AI agent:', error);
      typeMessage("I'm sorry, there was an error processing your question. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div ref={containerRef} className="min-h-[80vh] relative">
      <motion.div
        className={`fixed inset-0 ${theme === 'light' ? 'bg-white' : 'bg-black'} pointer-events-none`}
        style={{ opacity: backgroundOpacity }}
      />
      <motion.div
        className={`${theme === 'light' ? 'bg-white' : 'bg-white'} rounded-lg p-6 w-full max-w-4xl mx-auto relative shadow-2xl`}
        style={{
          opacity,
          scale,
          y,
          transformOrigin: "bottom",
          // Fix for blurry text
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          willChange: 'transform',
        }}
      >
        <div className="flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-black">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`${
                  msg.isUser 
                    ? "bg-gray-100 text-left ml-auto" 
                    : theme === 'light' ? "bg-orange-100 text-left" : "bg-blue-100 text-left"
                } rounded-lg p-3 max-w-[70%] shadow-sm`}
              >
                <p className="text-[16px] leading-normal font-['Rubik']">
                  {msg.text}
                  {msg.isTyping && <span className={`inline-block w-2 h-4 ml-1 ${theme === 'light' ? 'bg-orange-500' : 'bg-blue-500'} animate-pulse`}></span>}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className={`${theme === 'light' ? 'bg-orange-100' : 'bg-blue-100'} rounded-lg p-3 max-w-[70%] shadow-sm`}>
                <p className="text-[16px] leading-normal font-['Rubik']">Thinking...</p>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-[16px] font-['Rubik']"
                style={{
                  transform: 'translateZ(0)', // Force GPU acceleration
                  backfaceVisibility: 'hidden',
                }}
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage}
                className={`${theme === 'light' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-lg transition-colors font-['Rubik']`}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatBox;