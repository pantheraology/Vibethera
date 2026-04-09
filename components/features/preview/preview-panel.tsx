import React, { useState } from 'react';
import { useApp } from '../../../providers/app-provider';
import { LoadingState } from './loading-state';
import { ArrowLeft, ArrowRight, RotateCw, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { VibetheraLogo } from '../../ui/icons';

export const PreviewPanel = () => {
  const { isGenerating, previewUrl, generatedCode, isFullscreen, setIsFullscreen } = useApp();
  const [refreshKey, setRefreshKey] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false); // Mock state
  const [canGoForward, setCanGoForward] = useState(false); // Mock state

  const handleReload = () => {
      setRefreshKey(prev => prev + 1);
  };

  const handleExternal = () => {
      if (!generatedCode) return;
      
      const blob = new Blob([generatedCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const win = window.open(url, '_blank');
      
      // Cleanup the blob URL after a short delay to allow the new window to load it.
      // 1 second is usually sufficient for the window to navigate to the blob URL.
      setTimeout(() => {
          URL.revokeObjectURL(url);
      }, 1000);
  };

  const handleToggleFullscreen = () => {
      setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-full relative'} flex flex-col bg-surface rounded-lg overflow-hidden border border-interactive-border transition-all duration-300`}>
      {/* Browser Toolbar */}
      <div className="h-12 bg-[#0f0f0f] border-b border-gray-800 flex items-center px-4 space-x-4 shrink-0">
        <div className="flex items-center space-x-2">
            <button 
                onClick={() => setCanGoBack(!canGoBack)} // Mock action
                disabled={!canGoBack}
                className={`p-1.5 rounded transition-colors ${!canGoBack ? 'text-gray-700 cursor-not-allowed' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
            >
                <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
                onClick={() => setCanGoForward(!canGoForward)} // Mock action
                disabled={!canGoForward}
                className={`p-1.5 rounded transition-colors ${!canGoForward ? 'text-gray-700 cursor-not-allowed' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
            >
                <ArrowRight className="w-4 h-4" />
            </button>
            <button 
                onClick={handleReload}
                className="p-1.5 text-gray-500 hover:text-gray-300 rounded hover:bg-white/5 transition-colors"
                title="Reload Preview"
            >
                <RotateCw className="w-3.5 h-3.5" />
            </button>
        </div>

        <div className="flex-1 flex justify-center px-4">
            <div className="w-full max-w-2xl bg-[#27282d] h-7 rounded-full flex items-center justify-center text-xs text-gray-400 font-mono overflow-hidden">
                {isGenerating ? 'generating...' : previewUrl ? 'localhost:3000' : ''}
            </div>
        </div>

        <div className="flex items-center space-x-2">
             <button 
                onClick={handleExternal}
                className="p-1.5 text-gray-500 hover:text-gray-300 rounded hover:bg-white/5 transition-colors"
                title="Open in New Tab"
             >
                <ExternalLink className="w-4 h-4" />
            </button>
            <button 
                onClick={handleToggleFullscreen}
                className="p-1.5 text-gray-500 hover:text-gray-300 rounded hover:bg-white/5 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative bg-black">
        {isGenerating ? (
            <div className="absolute inset-0 bg-primary-background flex items-center justify-center z-10">
                <LoadingState />
            </div>
        ) : generatedCode ? (
             <iframe 
                key={refreshKey}
                srcDoc={generatedCode}
                className="w-full h-full border-none bg-white"
                title="Preview"
                sandbox="allow-scripts allow-same-origin allow-forms"
             />
        ) : (
            <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center text-text-muted">
                 <div className="mb-4 opacity-20">
                    <VibetheraLogo className="w-16 h-16 text-text-primary" />
                 </div>
                 <p>Preview will appear here</p>
            </div>
        )}
      </div>
    </div>
  );
};