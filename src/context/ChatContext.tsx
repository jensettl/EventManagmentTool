import React, { createContext, useState, useContext, useEffect } from 'react';
import { ChatContextType, ChatMessage } from '../types';
import { chatMessages as initialChatMessages } from '../data/mockData';
import { useAuth } from './AuthContext';

// Create the Chat Context
export const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Custom hook to use the Chat Context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { currentUser } = useAuth();

  // Initialize chat messages on component mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Sort messages by timestamp
        const sortedMessages = [...initialChatMessages].sort(
          (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        
        setMessages(sortedMessages);
        setLoading(false);
      } catch (err) {
        setError('Failed to load chat messages');
        setLoading(false);
      }
    };
    
    loadMessages();
  }, []);

  // Send a new message
  const sendMessage = (
    eventId: string, 
    content: string, 
    attachments?: { type: 'image' | 'link', url: string }[]
  ) => {
    if (!currentUser) return;
    
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      eventId,
      userId: currentUser.id,
      content,
      timestamp: new Date(),
      attachments
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  // Get all messages for a specific event
  const getEventMessages = (eventId: string) => {
    return messages.filter(message => message.eventId === eventId);
  };

  const contextValue: ChatContextType = {
    messages,
    loading,
    error,
    sendMessage,
    getEventMessages
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};