import React from 'react';
import { X, Copy, Check } from 'lucide-react';
import { useApp } from '../../../providers/app-provider';

// Simple syntax highlighting component (reused logic)
const HighlightedCode = ({ code }: { code: string }) => {
    const parts = code.split(/(\s+|[{}().,;<>="/])/);
    
    return (
        <span className="font-mono text-sm">
            {parts.map((part, i) => {
                let color = "text-gray-300";
                if (/^(import|export|function|return|const|let|var|if|else|default|switch|case|break|from)$/.test(part)) color = "text-fuchsia-400";
                else if (/^<\/?\w+/.test(part) || /^>$/.test(part) || /^\/>$/.test(part)) color = "text-blue-400"; // HTML tags
                else if (/^[A-Z][a-zA-Z]+$/.test(part)) color = "text-cyan-300"; // Component/Class
                else if (/^"[^"]*"$/.test(part) || /^'[^']*'$/.test(part)) color = "text-green-300"; // Strings
                else if (/^[{}]/.test(part)) color = "text-yellow-300";
                else if (/^[()]/.test(part)) color = "text-purple-300";
                else if (/^[0-9]+$/.test(part)) color = "text-amber-300";
                else if (part === 'className' || part === 'src' || part === 'href' || part === 'style' || part === 'onClick') color = "text-sky-300"; // Props
                
                return <span key={i} className={color}>{part}</span>
            })}
        </span>
    )
}

export const CodeViewer = () => {
  const { isCodeViewOpen, setIsCodeViewOpen, generatedCode } = useApp();
  const [copied, setCopied] = React.useState(false);

  if (!isCodeViewOpen) return null;

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="w-full max-w-5xl h-[85vh] bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-14 border-b border-[#333] flex items-center justify-between px-6 shrink-0 bg-[#141414]">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                 <span className="font-mono text-blue-400 font-bold">&lt;/&gt;</span>
             </div>
             <h3 className="text-white font-medium">Generated Code</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
                onClick={handleCopy}
                disabled={!generatedCode}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 bg-[#222] hover:bg-[#333] border border-[#333] rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
            <div className="w-px h-6 bg-[#333] mx-1" />
            <button
                onClick={() => setIsCodeViewOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#333] rounded-md transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto bg-[#0a0a0a] relative custom-scrollbar">
            {generatedCode ? (
                <div className="p-6">
                    <pre className="font-mono text-sm leading-relaxed tab-4">
                        <HighlightedCode code={generatedCode} />
                    </pre>
                </div>
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <p>No code generated yet.</p>
                    <p className="text-xs text-gray-600 mt-2">Start a chat to generate UI components.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};