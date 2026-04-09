import React, { useState } from 'react';
import { X, Moon, Sun, Monitor, Shield, Zap, User, Info, Check, ChevronRight } from 'lucide-react';
import { useApp } from '../../../providers/app-provider';
import { MODELS } from '../../../constants';

type SettingsTab = 'general' | 'generation' | 'privacy' | 'about';

export const SettingsModal = () => {
  const { isSettingsOpen, setIsSettingsOpen, selectedModel, setSelectedModel } = useApp();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [theme, setTheme] = useState<'system' | 'dark' | 'light'>('dark');
  const [streamResponse, setStreamResponse] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  if (!isSettingsOpen) return null;

  const tabs = [
    { id: 'general', label: 'General', icon: Monitor },
    { id: 'generation', label: 'AI Generation', icon: Zap },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl h-[600px] bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl flex overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        
        {/* Sidebar */}
        <div className="w-64 bg-[#141414] border-r border-[#333] flex flex-col">
          <div className="p-4 border-b border-[#333] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Settings</h2>
          </div>
          
          <nav className="flex-1 p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SettingsTab)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive 
                      ? 'bg-[#2a2a2a] text-white font-medium' 
                      : 'text-gray-400 hover:text-white hover:bg-[#222]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {isActive && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#333]">
             <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
                 <div className="text-xs">
                     <div className="text-white font-medium">User Account</div>
                     <div className="text-gray-500">Personal Plan</div>
                 </div>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col bg-[#1a1a1a]">
            {/* Header */}
            <div className="h-14 border-b border-[#333] flex items-center justify-between px-6 shrink-0">
                <h3 className="text-white font-medium capitalize">{activeTab.replace('-', ' ')}</h3>
                <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-1.5 text-gray-400 hover:text-white hover:bg-[#333] rounded-md transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                
                {/* GENERAL TAB */}
                {activeTab === 'general' && (
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-white mb-1">Appearance</h4>
                                <p className="text-xs text-gray-500">Customize how the application looks on your device.</p>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-3">
                                <button 
                                    onClick={() => setTheme('system')}
                                    className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                                        theme === 'system' 
                                        ? 'bg-[#2a2a2a] border-blue-500 text-white' 
                                        : 'bg-transparent border-[#333] text-gray-400 hover:bg-[#222]'
                                    }`}
                                >
                                    <Monitor className="w-5 h-5" />
                                    <span className="text-xs">System</span>
                                </button>
                                <button 
                                    onClick={() => setTheme('dark')}
                                    className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                                        theme === 'dark' 
                                        ? 'bg-[#2a2a2a] border-blue-500 text-white' 
                                        : 'bg-transparent border-[#333] text-gray-400 hover:bg-[#222]'
                                    }`}
                                >
                                    <Moon className="w-5 h-5" />
                                    <span className="text-xs">Dark</span>
                                </button>
                                <button 
                                    onClick={() => setTheme('light')}
                                    className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                                        theme === 'light' 
                                        ? 'bg-[#2a2a2a] border-blue-500 text-white' 
                                        : 'bg-transparent border-[#333] text-gray-400 hover:bg-[#222]'
                                    }`}
                                >
                                    <Sun className="w-5 h-5" />
                                    <span className="text-xs">Light</span>
                                </button>
                            </div>
                        </section>

                        <div className="h-px bg-[#333]" />

                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-medium text-white">Reduced Motion</h4>
                                    <p className="text-xs text-gray-500">Minimize animations throughout the UI.</p>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-9 h-5 bg-[#333] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* GENERATION TAB */}
                {activeTab === 'generation' && (
                    <div className="space-y-6">
                         <section className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-white mb-1">Default Model</h4>
                                <p className="text-xs text-gray-500">Select the AI model used for code generation.</p>
                            </div>
                            
                            <div className="space-y-2">
                                {MODELS.map((model) => (
                                    <div 
                                        key={model.id}
                                        onClick={() => setSelectedModel(model.id)}
                                        className={`flex items-start p-3 rounded-lg border cursor-pointer transition-all ${
                                            selectedModel === model.id 
                                            ? 'bg-[#2a2a2a] border-blue-500' 
                                            : 'border-[#333] hover:bg-[#222]'
                                        }`}
                                    >
                                        <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                                            selectedModel === model.id ? 'border-blue-500' : 'border-gray-500'
                                        }`}>
                                            {selectedModel === model.id && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-white">{model.name}</div>
                                            <div className="text-xs text-gray-500">{model.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="h-px bg-[#333]" />

                        <section className="space-y-4">
                             <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-medium text-white">Stream Responses</h4>
                                    <p className="text-xs text-gray-500">See the code being generated in real-time.</p>
                                </div>
                                <button 
                                    onClick={() => setStreamResponse(!streamResponse)}
                                    className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors ${streamResponse ? 'bg-blue-600' : 'bg-[#333]'}`}
                                >
                                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${streamResponse ? 'translate-x-4' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </section>
                    </div>
                )}

                {/* PRIVACY TAB */}
                {activeTab === 'privacy' && (
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-white mb-1">Telemetry</h4>
                                <p className="text-xs text-gray-500">Manage how we collect data to improve the service.</p>
                            </div>
                             <div className="flex items-center justify-between p-3 border border-[#333] rounded-lg">
                                <div>
                                    <h4 className="text-sm font-medium text-white">Share Usage Data</h4>
                                    <p className="text-xs text-gray-500">Help us improve Vibethera by sending anonymous usage statistics.</p>
                                </div>
                                <button 
                                    onClick={() => setAnalytics(!analytics)}
                                    className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors ${analytics ? 'bg-blue-600' : 'bg-[#333]'}`}
                                >
                                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${analytics ? 'translate-x-4' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </section>
                        
                        <section className="space-y-4">
                            <h4 className="text-sm font-medium text-white mb-1">Data Retention</h4>
                             <div className="flex items-center justify-between p-3 border border-[#333] rounded-lg">
                                <div>
                                    <h4 className="text-sm font-medium text-white text-red-400">Clear Local History</h4>
                                    <p className="text-xs text-gray-500">Remove all locally stored chat sessions and cache.</p>
                                </div>
                                <button className="px-3 py-1.5 bg-[#331111] hover:bg-red-900/50 text-red-400 border border-red-900/50 text-xs rounded-md transition-colors">
                                    Clear Data
                                </button>
                            </div>
                        </section>
                    </div>
                )}

                {/* ABOUT TAB */}
                {activeTab === 'about' && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-2xl">
                           <div className="w-8 h-8 bg-black rounded-sm" />
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">Vibethera</h2>
                            <p className="text-gray-500">v1.0.0 (Production Build)</p>
                        </div>

                        <div className="space-y-2 text-sm text-gray-400">
                             <p>Powered by Google Gemini 2.0 Flash & Pro</p>
                             <p>&copy; 2025 Panthera Inc. All rights reserved.</p>
                        </div>
                        
                        <div className="pt-6 border-t border-[#333] w-full max-w-xs flex justify-center space-x-4 text-xs text-gray-500">
                            <a href="#" className="hover:text-white hover:underline">Terms of Service</a>
                            <a href="#" className="hover:text-white hover:underline">Privacy Policy</a>
                        </div>
                    </div>
                )}

            </div>
            
            {/* Footer */}
            <div className="h-14 border-t border-[#333] flex items-center justify-end px-6 space-x-3 shrink-0 bg-[#1a1a1a]">
                <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-4 py-2 text-sm bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors shadow-lg"
                >
                    Save Changes
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};