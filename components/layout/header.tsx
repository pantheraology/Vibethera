import React from 'react';
import { VibetheraLogo, LockIcon } from '../ui/icons';
import { Code2, Github, Share2, ChevronDown } from 'lucide-react';
import { useApp } from '../../providers/app-provider';
import { TeamSelector } from '../features/header/team-selector';
import { ProjectSelector } from '../features/header/project-selector';

export const Header = () => {
  const { setIsSettingsOpen, setIsCodeViewOpen, setIsGithubModalOpen, setIsShareModalOpen, currentProject } = useApp();

  const handleSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCodeView = () => {
      setIsCodeViewOpen(true);
  };

  const handleGithub = () => {
      setIsGithubModalOpen(true);
  };

  const handleShare = () => {
      setIsShareModalOpen(true);
  };

  const handlePublish = () => {
      alert("Publishing...");
  };

  return (
    <header className="h-12 bg-primary-background border-b border-interactive-border flex items-center justify-between px-3 shrink-0">
      {/* LEFT SIDE */}
      <div className="flex items-center space-x-3 text-sm">
        <div className="text-white hover:opacity-80 cursor-pointer">
          <VibetheraLogo className="w-5 h-5 text-white" />
        </div>
        
        <span className="text-text-muted opacity-65 text-lg font-light">/</span>
        
        <TeamSelector />

        <span className="text-text-muted opacity-65 text-lg font-light">/</span>

        <ProjectSelector />

        <div className="flex items-center space-x-1 bg-black border border-white/5 rounded-full px-2 py-0.5 ml-2">
            <LockIcon className="w-3 h-3 text-text-muted" />
            <span className="text-xs text-text-muted font-medium">
                {currentProject.privacy === 'private' ? 'Private' : 'Public'}
            </span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center space-x-2">
         <div className="flex bg-surface-secondary rounded-md border border-white/10">
            <button 
                onClick={handleCodeView}
                className="h-8 px-3 flex items-center justify-center hover:bg-interactive-hover transition-colors text-text-secondary border-r border-white/10"
                title="View Code"
            >
                <Code2 className="w-4 h-4" />
            </button>
            <button 
                onClick={handleGithub}
                className="h-8 px-3 flex items-center justify-center hover:bg-interactive-hover transition-colors text-text-secondary"
                title="Push to GitHub"
            >
                <Github className="w-4 h-4" />
            </button>
         </div>

         <button 
            onClick={handleShare}
            className="h-8 px-3 flex items-center space-x-2 rounded-md hover:bg-interactive-hover transition-colors text-text-primary text-sm font-medium"
            title="Share"
         >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
         </button>

         <div className="flex items-center">
             <button 
                onClick={handlePublish}
                className="h-8 px-3 bg-white hover:bg-gray-200 text-black text-sm font-medium rounded-l-md transition-colors"
             >
                 Publish
             </button>
             <button 
                className="h-8 px-1.5 bg-white hover:bg-gray-200 text-black border-l border-gray-300 rounded-r-md transition-colors"
             >
                 <ChevronDown className="w-4 h-4" />
             </button>
         </div>

         <button 
             onClick={handleSettings}
             className="ml-2 w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center overflow-hidden border border-white/10 hover:opacity-80 transition-opacity"
             title="Settings"
         >
             <img src="https://picsum.photos/50/50" alt="Profile" className="w-full h-full object-cover" />
         </button>
      </div>
    </header>
  );
};