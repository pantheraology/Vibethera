import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../providers/app-provider';
import { ChatSidebar } from '../features/chat/chat-sidebar';
import { PreviewPanel } from '../features/preview/preview-panel';
import { SIDEBAR_CONFIG } from '../../constants';

export const ResizableLayout = () => {
  const { sidebarWidth, setSidebarWidth } = useApp();
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && containerRef.current) {
        const newWidth = mouseMoveEvent.clientX - containerRef.current.getBoundingClientRect().left;
        if (
          newWidth >= SIDEBAR_CONFIG.MIN_WIDTH &&
          newWidth <= SIDEBAR_CONFIG.MAX_WIDTH
        ) {
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing, setSidebarWidth]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div 
      ref={containerRef} 
      className="flex-1 flex overflow-hidden p-2 pt-2 gap-2"
      style={{ cursor: isResizing ? 'col-resize' : 'default' }}
    >
      {/* Sidebar */}
      <div 
        style={{ width: sidebarWidth, minWidth: SIDEBAR_CONFIG.MIN_WIDTH }} 
        className="h-full shrink-0 relative transition-[width] duration-0 ease-linear"
      >
        <ChatSidebar />
        
        {/* Resize Handle */}
        <div 
            className="absolute -right-3 top-0 bottom-0 w-4 cursor-col-resize z-50 flex justify-center group"
            onMouseDown={startResizing}
        >
            <div className={`w-[1px] h-full transition-colors ${
                isResizing ? 'bg-status-info' : 'bg-transparent group-hover:bg-status-info'
            }`} />
        </div>
      </div>

      {/* Main Content (Preview) */}
      <div className="flex-1 h-full min-w-0">
        <PreviewPanel />
      </div>
    </div>
  );
};