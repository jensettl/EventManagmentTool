import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Link as LinkIcon } from 'lucide-react';
import { ChatMessage } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import ChatMessageItem from './ChatMessageItem';

interface ChatWindowProps {
  eventId: string;
  onSignInClick: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ eventId, onSignInClick }) => {
  const [message, setMessage] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [attachmentType, setAttachmentType] = useState<'image' | 'link' | null>(null);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  
  const { currentUser, isAuthenticated } = useAuth();
  const { messages, sendMessage, getEventMessages } = useChat();
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Get messages for this event
  const eventMessages = getEventMessages(eventId);
  
  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [eventMessages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || !message.trim()) return;
    
    let attachments;
    if (attachmentUrl && attachmentType) {
      attachments = [{ type: attachmentType, url: attachmentUrl }];
    }
    
    sendMessage(eventId, message, attachments);
    setMessage('');
    setAttachmentUrl('');
    setAttachmentType(null);
  };
  
  const openAttachmentModal = (type: 'image' | 'link') => {
    setAttachmentType(type);
    setIsAttachmentModalOpen(true);
  };
  
  const closeAttachmentModal = () => {
    setIsAttachmentModalOpen(false);
  };
  
  const addAttachment = () => {
    if (!attachmentUrl) return;
    closeAttachmentModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[600px]">
      <div className="bg-purple-600 text-white p-4">
        <h3 className="text-lg font-semibold">Event Chat</h3>
      </div>
      
      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {eventMessages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          eventMessages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              isOwnMessage={currentUser?.id === message.userId}
            />
          ))
        )}
      </div>
      
      {/* Chat Input */}
      {isAuthenticated ? (
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          {attachmentUrl && (
            <div className="mb-2 p-2 bg-gray-100 rounded-md flex justify-between items-center">
              <div className="truncate flex-1">
                {attachmentType === 'image' ? (
                  <div className="flex items-center text-sm text-gray-600">
                    <Image className="h-4 w-4 mr-1" />
                    <span className="truncate">{attachmentUrl}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-gray-600">
                    <LinkIcon className="h-4 w-4 mr-1" />
                    <a 
                      href={attachmentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="truncate text-blue-600 hover:underline"
                    >
                      {attachmentUrl}
                    </a>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setAttachmentUrl('');
                  setAttachmentType(null);
                }}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <button
                type="button"
                onClick={() => openAttachmentModal('image')}
                className="p-2 rounded-full text-gray-500 hover:text-purple-600 hover:bg-gray-100"
              >
                <Image className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => openAttachmentModal('link')}
                className="p-2 rounded-full text-gray-500 hover:text-purple-600 hover:bg-gray-100"
              >
                <LinkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            
            <button
              type="submit"
              disabled={!message.trim()}
              className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 border-t bg-gray-50 text-center">
          <p className="text-gray-600 mb-2">Sign in to join the conversation</p>
          <button 
            onClick={onSignInClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Sign In
          </button>
        </div>
      )}
      
      {/* Attachment Modal */}
      {isAttachmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {attachmentType === 'image' ? 'Add Image URL' : 'Add Link URL'}
            </h3>
            
            <input
              type="text"
              value={attachmentUrl}
              onChange={(e) => setAttachmentUrl(e.target.value)}
              placeholder={
                attachmentType === 'image'
                  ? 'Paste image URL here...'
                  : 'Paste link URL here...'
              }
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-4"
            />
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeAttachmentModal}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addAttachment}
                disabled={!attachmentUrl}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;