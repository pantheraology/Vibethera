import React from 'react';
import { AppProvider } from './providers/app-provider';
import { ChatProvider } from './providers/chat-provider';
import { Header } from './components/layout/header';
import { ResizableLayout } from './components/layout/resizable-layout';
import { SettingsModal } from './components/features/settings/settings-modal';
import { CodeViewer } from './components/features/code/code-viewer';
import { GithubModal } from './components/features/github/github-modal';
import { ShareModal } from './components/features/share/share-modal';

const AppContent = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-primary-background text-text-primary overflow-hidden font-sans relative">
      <Header />
      <ResizableLayout />
      <SettingsModal />
      <CodeViewer />
      <GithubModal />
      <ShareModal />
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </AppProvider>
  );
};

export default App;