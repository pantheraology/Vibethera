import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Globe, Lock, Twitter } from 'lucide-react';
import { useApp } from '../../../providers/app-provider';

export const ShareModal = () => {
  const { isShareModalOpen, setIsShareModalOpen } = useApp();
  const [isPublic, setIsPublic] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (isShareModalOpen) {
      setUrl(window.location.href);
    }
  }, [isShareModalOpen]);

  if (!isShareModalOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
      setIsShareModalOpen(false);
  };

  const handleSocialShare = () => {
      window.open(`https://twitter.com/intent/tweet?text=Check%20out%20my%20app%20created%20with%20Vibethera&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
        <div className="w-full max-w-md bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="h-14 border-b border-[#333] flex items-center justify-between px-6 bg-[#141414]">
                <h3 className="font-medium text-white">Share Project</h3>
                <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                
                {/* Privacy Toggle */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPublic ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>
                            {isPublic ? <Globe className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-white">{isPublic ? 'Public Access' : 'Private Access'}</h4>
                            <p className="text-xs text-gray-400">{isPublic ? 'Anyone with the link can view' : 'Only you can access this project'}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsPublic(!isPublic)}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isPublic ? 'bg-blue-600' : 'bg-[#333]'}`}
                    >
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isPublic ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                <div className="h-px bg-[#333]" />

                {/* URL Input */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400">Project URL</label>
                    <div className="flex space-x-2">
                        <div className="flex-1 bg-[#0a0a0a] border border-[#333] rounded-lg px-3 py-2 text-sm text-gray-300 truncate font-mono outline-none focus:border-blue-500 transition-colors">
                            {url}
                        </div>
                        <button 
                            onClick={handleCopy}
                            className="px-3 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            <span>{copied ? 'Copied' : 'Copy'}</span>
                        </button>
                    </div>
                </div>

                {/* Social Share */}
                <div className="pt-2">
                    <button 
                        onClick={handleSocialShare}
                        className="w-full py-2.5 border border-[#333] hover:bg-[#222] rounded-lg text-sm text-white font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                        <Twitter className="w-4 h-4 text-white fill-white" />
                        <span>Share on X</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};