import { useChat } from '../providers/chat-provider';
import { useApp } from '../providers/app-provider';
import { generateContent } from '../services/ai';
import { extractCode } from '../lib/utils/parsing';
import { generateId } from '../lib/utils/format';
import { PLANNING_SYSTEM_PROMPT } from '../lib/templates/plan-prompt';
import { PREVIEW_SYSTEM_PROMPT } from '../lib/templates/html-preview';

export const useCodeGenerator = () => {
  const { addMessage, setLoading, isLoading, messages } = useChat();
  const { setIsGenerating, setPreviewUrl, setGeneratedCode, selectedModel, isPlanningMode, setIsPlanningMode } = useApp();

  const generate = async (userMessage: string, currentImage: string | null, isPlanningOverride?: boolean) => {
    if (!userMessage.trim() && !currentImage) return;

    // Resolve the effective mode (handle race condition of state update)
    const effectiveIsPlanning = isPlanningOverride ?? isPlanningMode;

    // 1. Add User Message
    addMessage({
      id: generateId(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
      attachment: currentImage ? { type: 'image', data: currentImage } : undefined
    });

    // 2. Set Loading States
    setLoading(true);
    
    // Only set generating state if NOT in planning mode
    if (!effectiveIsPlanning) {
        setIsGenerating(true);
    }

    try {
      // Determine System Prompt
      const systemInstruction = effectiveIsPlanning ? PLANNING_SYSTEM_PROMPT : PREVIEW_SYSTEM_PROMPT;
      
      // 3. Call Gemini API
      const response = await generateContent(
        userMessage, 
        currentImage, 
        messages, // Pass full history
        selectedModel, 
        {
          useSearch: true,
          useThinking: true,
          systemInstruction
        }
      );

      if (response && response.text) {
        let responseText = response.text;
        
        // CHECK FOR SPEC GENERATION (Transition from Plan -> Code)
        const specMatch = responseText.match(/<spec>([\s\S]*?)<\/spec>/);
        if (specMatch && effectiveIsPlanning) {
             const finalSpec = specMatch[1];
             
             // Add the planner's confirmation message first
             addMessage({
                id: generateId(),
                role: 'assistant',
                content: "Plan approved! Starting generation...",
                timestamp: new Date()
             });

             // Switch modes
             setIsPlanningMode(false);
             setIsGenerating(true);

             // IMMEDIATELY Trigger Code Generation with the Spec
             const codeResponse = await generateContent(
                 finalSpec,
                 null,
                 [], // Clear history for the fresh start of coding to avoid confusion with the planner.
                 selectedModel,
                 {
                     useSearch: true,
                     useThinking: true,
                     systemInstruction: PREVIEW_SYSTEM_PROMPT
                 }
             );
             
             if (codeResponse && codeResponse.text) {
                 const code = extractCode(codeResponse.text);
                 if (code) {
                     setGeneratedCode(code);
                     setPreviewUrl('generated');
                 }
                 
                 addMessage({
                    id: generateId(),
                    role: 'assistant',
                    content: codeResponse.text,
                    timestamp: new Date(),
                    groundingMetadata: codeResponse.groundingMetadata
                 });
             }

        } else {
            // Normal Response (Planning or Coding)
            
            // Extract HTML code if we are NOT in planning mode (or if mixed)
            if (!effectiveIsPlanning) {
                const code = extractCode(responseText);
                if (code) {
                    setGeneratedCode(code);
                    setPreviewUrl('generated');
                }
            }

            addMessage({
              id: generateId(),
              role: 'assistant',
              content: responseText,
              timestamp: new Date(),
              groundingMetadata: response.groundingMetadata
            });
        }
      }
    } catch (err) {
      console.error(err);
      addMessage({
        id: generateId(),
        role: 'assistant',
        content: "Sorry, I encountered an error processing your request.",
        timestamp: new Date()
      });
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  const startPlanning = async (initialMessage?: string) => {
      setIsPlanningMode(true);
      const message = initialMessage || "I want to plan a new project. Help me define the requirements.";
      // Pass 'true' to override the stale closure state of isPlanningMode
      await generate(message, null, true);
  };

  return {
    generate,
    startPlanning,
    isLoading
  };
};