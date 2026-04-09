
export interface AppState {
  selectedModel: string;
  previewUrl: string | null;
  generatedCode: string | null;
  isGenerating: boolean;
  sidebarWidth: number;
  features: {
    imageGeneration: boolean;
    codeExport: boolean;
    realTimePreview: boolean;
  };
}

export interface Attachment {
    type: 'image';
    data: string; // Base64 data url
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  attachment?: Attachment;
  groundingMetadata?: any; // For search results
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: Date;
}

export interface ChatState {
  currentSession: ChatSession | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface GenerationResponse {
  success: boolean;
  chatUrl?: string;
  previewUrl?: string;
  chatId?: string;
  error?: string;
}

export type VibetheraModel = 'gemini-3-flash-preview' | 'gemini-3-pro-preview';
