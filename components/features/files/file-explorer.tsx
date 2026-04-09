import React from 'react';
import { ChevronDown, FileCode } from 'lucide-react';

const FILES = [
  { name: 'components/chat-form.tsx', status: 'generated' },
  { name: 'components/autoresize-textarea.tsx', status: 'generated' },
  { name: 'app/page.tsx', status: 'modified' },
  { name: 'app/layout.tsx', status: 'unchanged' },
  { name: 'app/api/chat/route.ts', status: 'unchanged' },
];

export const FileExplorer = () => {
  return (
    <div className="mt-4 rounded-lg border border-interactive-border bg-surface overflow-hidden font-mono text-sm">
      <div className="px-3 py-2 border-b border-interactive-border flex items-center justify-between bg-[rgba(20,20,21,0.5)]">
        <div className="flex items-center space-x-2 text-text-secondary">
          <ChevronDown className="w-4 h-4" />
          <span>Version 1</span>
        </div>
        <div className="flex space-x-2">
            <span className="px-1.5 py-0.5 rounded bg-interactive-hover text-xs text-text-primary">Latest</span>
            <span className="px-1.5 py-0.5 rounded bg-interactive-active text-xs text-text-primary">Viewing</span>
        </div>
      </div>
      
      <div className="py-1">
        {FILES.map((file) => (
          <div key={file.name} className="px-3 py-1.5 flex items-center space-x-2 hover:bg-interactive-hover cursor-pointer group">
            <FileCode className={`w-4 h-4 ${
                file.status === 'generated' ? 'text-status-success' :
                file.status === 'modified' ? 'text-status-warning' :
                'text-text-muted'
            }`} />
            <span className={`truncate ${
                 file.status === 'generated' ? 'text-status-success' :
                 file.status === 'modified' ? 'text-status-warning' :
                 'text-text-muted'
            }`}>
                {file.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};