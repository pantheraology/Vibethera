import React, { useState, useRef } from 'react';
import { Paperclip, ArrowUp, Mic, X, Compass } from 'lucide-react';
import { useCodeGenerator } from '../../../hooks/use-code-generator';
import { useAudioRecorder } from '../../../hooks/use-audio-recorder';
import { useApp } from '../../../providers/app-provider';

export const ChatInput = () => {
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isPlanningMode } = useApp();
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { generate, startPlanning, isLoading } = useCodeGenerator();

  const handleTranscription = (text: string) => {
    setInput((prev) => prev + (prev ? ' ' : '') + text);
    adjustHeight();
  };

  const { isRecording, isProcessing, startRecording, stopRecording } = useAudioRecorder({
    onTranscriptionComplete: handleTranscription
  });

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
      if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = `${Math.max(96, textareaRef.current.scrollHeight)}px`;
      }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if ((!input.trim() && !selectedImage) || isLoading || isProcessing) return;

    const userMessage = input;
    const currentImage = selectedImage;
    
    // Reset UI state immediately
    setInput('');
    setSelectedImage(null);
    if (textareaRef.current) textareaRef.current.style.height = '96px';

    await generate(userMessage, currentImage);
  };

  const handlePlanClick = async () => {
      if (isLoading || isProcessing) return;
      
      const message = input.trim() ? input.trim() : undefined;
      
      // Reset UI state
      setInput('');
      setSelectedImage(null);
      if (textareaRef.current) textareaRef.current.style.height = '96px';

      await startPlanning(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isBusy = isLoading || isProcessing;

  return (
    <div className={`p-4 border-t border-interactive-border bg-primary-background ${isPlanningMode ? 'border-t-blue-500/30' : ''}`}>
      {isPlanningMode && (
          <div className="flex items-center space-x-2 mb-2 text-xs font-medium text-blue-400 animate-pulse">
              <Compass className="w-3.5 h-3.5" />
              <span>Planning Mode Active</span>
          </div>
      )}
      <div className={`relative rounded-xl border bg-surface focus-within:ring-1 focus-within:ring-white/20 transition-all ${isPlanningMode ? 'border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-interactive-border'}`}>
        {selectedImage && (
            <div className="p-3 pb-0">
                <div className="relative inline-block">
                    <img src={selectedImage} alt="Upload" className="h-16 w-16 object-cover rounded-md border border-interactive-border" />
                    <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute -top-2 -right-2 bg-status-error text-white rounded-full p-0.5 hover:bg-red-600"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            </div>
        )}
        
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={isRecording ? "Listening..." : isProcessing ? "Transcribing..." : isPlanningMode ? "Describe your requirements..." : "Ask Vibethera..."}
          className="w-full bg-transparent text-text-primary text-sm p-3 pb-12 min-h-[96px] max-h-[200px] resize-none focus:outline-none placeholder:text-text-muted"
          disabled={isBusy || isRecording}
        />
        
        {/* Left Controls: Attach & Mic */}
        <div className="absolute bottom-2 left-2 flex items-center space-x-2">
           <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageSelect}
           />
           <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-interactive-hover rounded-md transition-colors"
              disabled={isBusy}
              title="Attach Image"
           >
             <Paperclip className="w-5 h-5" />
           </button>
           
           <button 
             onMouseDown={startRecording}
             onMouseUp={stopRecording}
             onMouseLeave={stopRecording}
             disabled={isBusy}
             className={`p-1.5 rounded-md transition-colors ${isRecording ? 'text-status-error animate-pulse' : 'text-text-muted hover:text-text-primary hover:bg-interactive-hover'}`}
             title="Voice Input"
           >
             <Mic className="w-5 h-5" />
           </button>

           <div className="w-px h-4 bg-interactive-border mx-1" />

           <button 
             onClick={handlePlanClick}
             disabled={isBusy || isPlanningMode}
             className={`p-1.5 rounded-md transition-colors flex items-center space-x-1 ${
                 isPlanningMode 
                 ? 'text-blue-400 bg-blue-500/10' 
                 : 'text-text-muted hover:text-blue-400 hover:bg-interactive-hover'
             }`}
             title="Plan Project"
           >
             <Compass className="w-5 h-5" />
           </button>
        </div>

        {/* Right Controls: Submit */}
        <div className="absolute bottom-2 right-2 flex items-center space-x-2">
           <button 
             onClick={handleSubmit}
             disabled={(!input.trim() && !selectedImage) || isBusy}
             className={`p-1.5 rounded-md transition-colors ${
               (input.trim() || selectedImage) && !isBusy
                ? 'bg-interactive-primary text-black hover:opacity-90' 
                : 'bg-interactive-hover text-text-muted cursor-not-allowed'
             }`}
           >
             <ArrowUp className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
};