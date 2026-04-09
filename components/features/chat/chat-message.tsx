import React from 'react';
import { Message } from '../../../types';
import { formatRelativeTime } from '../../../lib/utils/format';
import { Bot, User, Globe, Compass, CheckCircle } from 'lucide-react';
import { FileExplorer } from '../files/file-explorer';

export const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';

  // Helper to extract URLs from grounding chunks
  const getGroundingUrls = (chunks: any[]) => {
      if (!chunks) return [];
      return chunks.flatMap(chunk => {
          if (chunk.web?.uri) return [{ uri: chunk.web.uri, title: chunk.web.title }];
          return [];
      });
  };

  const groundingUrls = message.groundingMetadata?.groundingChunks 
      ? getGroundingUrls(message.groundingMetadata.groundingChunks)
      : [];

  // Parse for Plan content
  const planMatch = message.content.match(/<plan>([\s\S]*?)<\/plan>/);
  const displayContent = planMatch ? message.content.replace(/<plan>[\s\S]*?<\/plan>/, '') : message.content;
  const planContent = planMatch ? planMatch[1] : null;

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        
        <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isUser ? 'bg-surface-elevated' : 'bg-black border border-white/10'
            }`}>
                {isUser ? <User className="w-5 h-5 text-text-muted" /> : <Bot className="w-5 h-5 text-text-primary" />}
            </div>

            <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
                {message.attachment && message.attachment.type === 'image' && (
                    <div className="mb-2">
                        <img 
                            src={message.attachment.data} 
                            alt="User upload" 
                            className="max-w-xs rounded-lg border border-interactive-border" 
                        />
                    </div>
                )}
                
                {/* Normal Text Content */}
                {displayContent.trim() && (
                    <div className={`relative px-4 py-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser 
                        ? 'bg-interactive-active text-text-primary' 
                        : 'bg-transparent text-text-primary'
                    }`}>
                    {displayContent}
                    </div>
                )}

                {/* Plan Card */}
                {planContent && (
                    <div className="mt-2 w-full max-w-2xl bg-[#0f172a] border border-blue-900/50 rounded-xl overflow-hidden shadow-2xl">
                        <div className="px-4 py-3 border-b border-blue-900/30 bg-blue-900/20 flex items-center space-x-2">
                             <Compass className="w-5 h-5 text-blue-400" />
                             <span className="font-medium text-blue-100 text-sm">Proposed Project Plan</span>
                        </div>
                        <div className="p-5 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-mono">
                            {planContent}
                        </div>
                        <div className="px-4 py-3 bg-blue-900/10 border-t border-blue-900/30 flex items-center justify-between">
                            <span className="text-xs text-blue-300/70">Type "Approve" to start building</span>
                            <div className="flex items-center space-x-2">
                                <span className="flex items-center text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Reviewing
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Search Grounding Sources */}
        {!isUser && groundingUrls.length > 0 && (
             <div className="mt-2 ml-11 flex flex-wrap gap-2">
                 {groundingUrls.map((url: any, idx: number) => (
                     <a 
                        key={idx} 
                        href={url.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-2 py-1 rounded bg-surface-elevated border border-interactive-border hover:bg-interactive-hover transition-colors text-xs text-text-secondary truncate max-w-[200px]"
                     >
                         <Globe className="w-3 h-3 text-status-info" />
                         <span className="truncate">{url.title || url.uri}</span>
                     </a>
                 ))}
             </div>
        )}

        {!isUser && (
            <div className="mt-1 ml-11">
                <span className="text-xs text-text-muted">{formatRelativeTime(message.timestamp)}</span>
            </div>
        )}

        {!isUser && message.content.includes("structure") && !planContent && (
            <div className="w-full pl-11 mt-2">
                <FileExplorer />
            </div>
        )}

      </div>
    </div>
  );
};