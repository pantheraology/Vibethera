import React from 'react';
import { useChat } from '../../../providers/chat-provider';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';

export const ChatSidebar = () => {
  const { messages } = useChat();

  return (
    <div className="flex flex-col h-full bg-[rgba(15,15,15,1)] rounded-lg overflow-hidden border border-interactive-border">
      {/* Header */}
      <div className="h-12 px-4 flex items-center space-x-6 border-b border-interactive-border">
        <button className="text-sm font-medium text-text-primary border-b-2 border-text-primary py-3.5">
            Chat
        </button>
        <button className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            Design
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {messages.length === 0 ? (
           <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]" style={{animationFillMode: 'forwards', opacity: 1}}>
              <h3 className="text-text-primary font-medium mb-2">What can I help you build?</h3>
              <p className="text-sm text-text-muted">Generate UI components, pages, or entire apps.</p>
           </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))
        )}
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
};