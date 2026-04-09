import React, { useEffect, useState } from 'react';
import { MOCK_CODE_SEQUENCE } from '../../../constants';
import { Loader2 } from 'lucide-react';

const HighlightedCode = ({ code }: { code: string }) => {
    // Very basic syntax highlighting simulation
    const parts = code.split(/(\s+|[{}().,;])/);
    
    return (
        <span className="font-mono text-sm">
            {parts.map((part, i) => {
                let color = "text-gray-300";
                if (/^(import|export|function|return|const|let|var|if|else)$/.test(part)) color = "text-fuchsia-400";
                else if (/^[A-Z][a-zA-Z]+$/.test(part)) color = "text-cyan-300";
                else if (/^"[^"]*"$/.test(part)) color = "text-green-300";
                else if (/^[{}]/.test(part)) color = "text-yellow-300";
                else if (/^[()]/.test(part)) color = "text-purple-300";
                else if (/^[0-9]+$/.test(part)) color = "text-amber-300";
                else if (part === 'className') color = "text-sky-300";
                
                return <span key={i} className={color}>{part}</span>
            })}
        </span>
    )
}

export const LoadingState = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % MOCK_CODE_SEQUENCE.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const currentStep = MOCK_CODE_SEQUENCE[stepIndex];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-xl mx-auto px-4">
      <div className="flex items-center space-x-3 mb-6">
        <Loader2 className="w-5 h-5 animate-spin text-status-info" />
        <span className="text-text-secondary text-sm font-mono">{currentStep.text}</span>
      </div>

      <div className="w-full bg-[#0d0d0d] rounded-lg border border-interactive-border p-6 relative overflow-hidden h-64 shadow-2xl">
         {/* Code Content */}
         <pre className="whitespace-pre-wrap transition-opacity duration-300">
             <HighlightedCode code={currentStep.code} />
         </pre>

         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d0d0d]" />
      </div>
    </div>
  );
};