import React, { useState, useRef, useEffect } from 'react';
import { ChevronsUpDown, Check, Plus } from 'lucide-react';
import { useApp, Team } from '../../../providers/app-provider';

export const TeamSelector = () => {
    const { currentTeam, setCurrentTeam } = useApp();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Mock Teams
    const teams: Team[] = [
        { id: 'personal', name: 'Personal', avatarUrl: 'https://picsum.photos/40/40', type: 'personal' },
        { id: 'acme', name: 'Acme Corp', avatarUrl: 'https://picsum.photos/41/41', type: 'team' },
        { id: 'startup', name: 'My Startup', avatarUrl: 'https://picsum.photos/42/42', type: 'team' }
    ];

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
                className="flex items-center space-x-2 hover:bg-interactive-hover px-2 py-1 rounded transition-colors group"
            >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 overflow-hidden border border-white/10">
                    <img src={currentTeam.avatarUrl} alt={currentTeam.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-text-primary font-medium text-sm">{currentTeam.name}</span>
                <ChevronsUpDown className="w-3 h-3 text-text-muted group-hover:text-text-primary" />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl z-50 overflow-hidden animate-[fadeIn_0.1s_ease-out]">
                    <div className="p-2">
                        <div className="px-2 py-1.5 text-xs font-medium text-gray-500">Personal Account</div>
                        <button 
                            onClick={() => { setCurrentTeam(teams[0]); setIsOpen(false); }}
                            className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-[#2a2a2a] rounded-md group"
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 rounded-full overflow-hidden">
                                     <img src={teams[0].avatarUrl} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-sm text-white">{teams[0].name}</span>
                            </div>
                            {currentTeam.id === teams[0].id && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>

                        <div className="my-2 h-px bg-[#333]" />

                         <div className="px-2 py-1.5 text-xs font-medium text-gray-500">Teams</div>
                         {teams.slice(1).map(team => (
                             <button 
                                key={team.id}
                                onClick={() => { setCurrentTeam(team); setIsOpen(false); }}
                                className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-[#2a2a2a] rounded-md group"
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 rounded-md overflow-hidden bg-gray-700 flex items-center justify-center text-xs">
                                         {team.avatarUrl ? <img src={team.avatarUrl} className="w-full h-full object-cover" /> : team.name[0]}
                                    </div>
                                    <span className="text-sm text-white">{team.name}</span>
                                </div>
                                {currentTeam.id === team.id && <Check className="w-3.5 h-3.5 text-white" />}
                            </button>
                         ))}
                         
                         <button className="w-full flex items-center space-x-2 px-2 py-2 mt-1 hover:bg-[#2a2a2a] rounded-md text-gray-400 hover:text-white transition-colors">
                            <div className="w-5 h-5 rounded-md border border-gray-600 border-dashed flex items-center justify-center">
                                <Plus className="w-3 h-3" />
                            </div>
                            <span className="text-sm">Create Team</span>
                         </button>
                    </div>
                </div>
            )}
        </div>
    );
};