import { useState, useRef, useCallback } from 'react';
import { transcribeAudio } from '../services/ai';

interface UseAudioRecorderProps {
  onTranscriptionComplete: (text: string) => void;
  onError?: (error: any) => void;
}

export const useAudioRecorder = ({ onTranscriptionComplete, onError }: UseAudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        setIsProcessing(true);
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          try {
            const text = await transcribeAudio(base64Audio);
            if (text) {
              onTranscriptionComplete(text);
            }
          } catch (err) {
            console.error("Transcription failed", err);
            if (onError) onError(err);
          } finally {
            setIsProcessing(false);
          }
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied", err);
      if (onError) onError(err);
    }
  }, [onTranscriptionComplete, onError]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  return {
    isRecording,
    isProcessing,
    startRecording,
    stopRecording
  };
};