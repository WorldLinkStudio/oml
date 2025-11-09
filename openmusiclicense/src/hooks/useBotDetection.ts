import { useEffect, useState } from 'react';
import { detectBot } from '../utils/botDetection';

export interface BotDetectionResult {
  isBot: boolean;
  botKind?: string;
  isLoading: boolean;
}

export const useBotDetection = (): BotDetectionResult => {
  const [result, setResult] = useState<BotDetectionResult>({
    isBot: false,
    isLoading: true,
  });

  useEffect(() => {
    try {
      const detection = detectBot();
      setResult({
        isBot: detection.isBot,
        botKind: detection.botKind,
        isLoading: false,
      });
    } catch (error) {
      console.error('Bot detection error:', error);
      setResult({
        isBot: false,
        isLoading: false,
      });
    }
  }, []);

  return result;
};

