import React, { useState, useRef, useEffect } from 'react';
import { ChevronsUpDown, Search, Plus, Folder, Check } from 'lucide-react';
import { useApp, Project } from '../../../providers/app-provider';
import { formatRelativeTime } from '../../../lib/utils/format';

export const ProjectSelector = () => {
    const { currentProject, setCurrentProject } = useApp();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Mock Projects
    const projects: Project[] = [
        { id: 'p1', name: 'Vibethera Community Starter', privacy: 'private', updatedAt: new Date() },
        { id: 'p2', name: 'E-commerce Dashboard', privacy: 'public', updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
        { id: 'p3', name: 'Portfolio Site 2025', privacy: 'private', updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) },
        { id: 'p4', name: 'Landing Page Test', privacy: 'public', updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) },
    ];

    const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 hover:bg-interactive-hover px-2 py-1 rounded transition-colors group max-w-[200px]"
            >
                 <span className="text-text-primary font-medium text-sm truncate">{currentProject.name}</span>
                 <ChevronsUpDown className="w-3 h-3 text-text-muted group-hover:text-text-primary shrink-0" />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl z-50 overflow-hidden animate-[fadeIn_0.1s_ease-out]">
                    <div className="p-2 border-b border-[#333]">
                        <div className="relative">
                            <Search className="absolute left-2 top-2 w-3.5 h-3.5 text-gray-500" />
                            <input 
                                type="text" 
                                placeholder="Search projects..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoFocus
                                className="w-full bg-[#0a0a0a] border border-[#333] rounded-md pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 placeholder:text-gray-600"
                            />
                        </div>
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto p-1 custom-scrollbar">
                        <div className="px-2 py-1.5 text-xs font-medium text-gray-500">Recent Projects</div>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map(project => (
                                <button 
                                    key={project.id}
                                    onClick={() => { setCurrentProject(project); setIsOpen(false); }}
                                    className="w-full flex items-center justify-between px-2 py-2 hover:bg-[#2a2a2a] rounded-md group text-left"
                                >
                                    <div className="flex items-center space-x-2.5 overflow-hidden">
                                        <Folder className="w-4 h-4 text-gray-500 shrink-0" />
                                        <div className="overflow-hidden">
                                            <div className="text-sm text-white truncate">{project.name}</div>
                                            <div className="text-[10px] text-gray-500 flex items-center space-x-1">
                                                <span>{formatRelativeTime(project.updatedAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {currentProject.id === project.id && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-center text-xs text-gray-500">No projects found</div>
                        )}
                    </div>

                    <div className="p-1 border-t border-[#333]">
                         <button className="w-full flex items-center space-x-2 px-2 py-2 hover:bg-[#2a2a2a] rounded-md text-gray-400 hover:text-white transition-colors">
                            <Plus className="w-4 h-4" />
                            <span className="text-sm">New Project</span>
                         </button>
                    </div>
                </div>
            )}
        </div>
    );
};