import React, { useState } from 'react';
import { BarChart2, ChevronDown, Check } from 'lucide-react';
import { useApp } from '../../../providers/app-provider';
import { MODELS } from '../../../constants';

export const ModelSelector = () => {
  const { selectedModel, setSelectedModel } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const currentModel = MODELS.find(m => m.id === selectedModel);

  return (
    <div className="relative mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-interactive-hover transition-colors text-sm"
      >
        <BarChart2 className="w-4 h-4 text-status-success" />
        <span className="text-text-secondary font-medium">{currentModel?.name}</span>
        <ChevronDown className="w-3 h-3 text-text-muted" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-64 bg-[rgba(20,20,21,1)] border border-interactive-border rounded-lg shadow-xl z-20 p-1">
            {MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  setSelectedModel(model.id);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-interactive-hover flex items-start space-x-2 group"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${selectedModel === model.id ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                      {model.name}
                    </span>
                    {selectedModel === model.id && (
                      <Check className="w-3.5 h-3.5 text-status-success" />
                    )}
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{model.description}</p>
                </div>
              </button>
            ))}
            
            <div className="h-px bg-interactive-border my-1" />
            
            <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-xs text-text-secondary">Generate Images</span>
                <div className="w-8 h-4 bg-status-success rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-black rounded-full shadow-sm" />
                </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};