import React from 'react';
import { ChatMessage } from '../../types';
import { users } from '../../data/mockData';
import { Image, Link as LinkIcon } from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
  isOwnMessage: boolean;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ 
  message, 
  isOwnMessage 
}) => {
  // Find sender in our mock data
  const sender = users.find(user => user.id === message.userId);
  
  // Format time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div 
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] ${isOwnMessage ? 'order-2' : 'order-2'}`}
      >
        {/* Message bubble */}
        <div 
          className={`rounded-lg px-4 py-2 shadow-sm ${
            isOwnMessage 
              ? 'bg-purple-600 text-white rounded-br-none' 
              : 'bg-white text-gray-800 rounded-bl-none'
          }`}
        >
          {/* Sender name (only on non-own messages) */}
          {!isOwnMessage && sender && (
            <div className="font-medium text-sm mb-1 text-purple-600">
              {sender.name}
            </div>
          )}
          
          {/* Message content */}
          <div className="text-sm whitespace-pre-wrap">
            {message.content}
          </div>
          
          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="mt-1">
                  {attachment.type === 'image' ? (
                    <div>
                      <a 
                        href={attachment.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`block p-1 rounded hover:opacity-90 transition-opacity ${
                          isOwnMessage ? 'bg-purple-700' : 'bg-gray-100'
                        }`}
                      >
                        <img 
                          src={attachment.url} 
                          alt="Shared image" 
                          className="rounded max-h-48 max-w-full object-contain"
                        />
                      </a>
                    </div>
                  ) : (
                    <a 
                      href={attachment.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center py-1 px-2 rounded ${
                        isOwnMessage 
                          ? 'bg-purple-700 text-white hover:bg-purple-800' 
                          : 'bg-gray-100 text-blue-600 hover:bg-gray-200'
                      }`}
                    >
                      <LinkIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm truncate">
                        {new URL(attachment.url).hostname}
                      </span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Timestamp */}
          <div 
            className={`text-xs mt-1 ${
              isOwnMessage ? 'text-purple-200 text-right' : 'text-gray-500'
            }`}
          >
            {formatTime(new Date(message.timestamp))}
          </div>
        </div>
      </div>
      
      {/* Avatar (only on non-own messages) */}
      {!isOwnMessage && sender && (
        <div className="flex-shrink-0 order-1 mr-2">
          <img 
            src={sender.avatar} 
            alt={sender.name} 
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default ChatMessageItem;