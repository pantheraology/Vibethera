import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, VibetheraModel } from '../types';
import { SIDEBAR_CONFIG } from '../constants';

export interface Team {
  id: string;
  name: string;
  avatarUrl: string;
  type: 'personal' | 'team';
}

export interface Project {
  id: string;
  name: string;
  privacy: 'public' | 'private';
  updatedAt: Date;
}

interface AppContextType extends AppState {
  setSidebarWidth: (width: number) => void;
  setSelectedModel: (model: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setPreviewUrl: (url: string | null) => void;
  setGeneratedCode: (code: string | null) => void;
  isFullscreen: boolean;
  setIsFullscreen: (isFullscreen: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (isOpen: boolean) => void;
  isCodeViewOpen: boolean;
  setIsCodeViewOpen: (isOpen: boolean) => void;
  isGithubModalOpen: boolean;
  setIsGithubModalOpen: (isOpen: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (isOpen: boolean) => void;
  currentTeam: Team;
  setCurrentTeam: (team: Team) => void;
  currentProject: Project;
  setCurrentProject: (project: Project) => void;
  isPlanningMode: boolean;
  setIsPlanningMode: (isPlanning: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_TEAM: Team = {
  id: 'personal',
  name: 'Personal',
  avatarUrl: 'https://picsum.photos/40/40',
  type: 'personal'
};

const DEFAULT_PROJECT: Project = {
  id: 'p1',
  name: 'Vibethera Community Starter',
  privacy: 'private',
  updatedAt: new Date()
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_CONFIG.DEFAULT_WIDTH);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3-pro-preview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCodeViewOpen, setIsCodeViewOpen] = useState(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team>(DEFAULT_TEAM);
  const [currentProject, setCurrentProject] = useState<Project>(DEFAULT_PROJECT);
  const [isPlanningMode, setIsPlanningMode] = useState(false);
  
  const [features] = useState({
    imageGeneration: true,
    codeExport: true,
    realTimePreview: true,
  });

  return (
    <AppContext.Provider
      value={{
        sidebarWidth,
        setSidebarWidth,
        selectedModel,
        setSelectedModel,
        isGenerating,
        setIsGenerating,
        previewUrl,
        setPreviewUrl,
        generatedCode,
        setGeneratedCode,
        features,
        isFullscreen,
        setIsFullscreen,
        isSettingsOpen,
        setIsSettingsOpen,
        isCodeViewOpen,
        setIsCodeViewOpen,
        isGithubModalOpen,
        setIsGithubModalOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        currentTeam,
        setCurrentTeam,
        currentProject,
        setCurrentProject,
        isPlanningMode,
        setIsPlanningMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};