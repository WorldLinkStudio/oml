import { type FC, type ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { detectBot } from '../utils/botDetection';

export interface BotDetectionContextValue {
  isBot: boolean;
  botKind?: string;
  isLoading: boolean;
}

const BotDetectionContext = createContext<BotDetectionContextValue>({
  isBot: false,
  isLoading: true,
});

export const useBotDetectionContext = () => useContext(BotDetectionContext);

export const BotDetectionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<BotDetectionContextValue>({
    isBot: false,
    isLoading: true,
  });

  useEffect(() => {
    try {
      const detection = detectBot();
      
      const newState = {
        isBot: detection.isBot,
        botKind: detection.botKind,
        isLoading: false,
      };
      
      setState(newState);

      // Log bot detection for analytics
      if (detection.isBot) {
        console.info('[Bot Detection]', {
          botKind: detection.botKind,
          userAgent: navigator.userAgent,
        });
      }

      // Store in session storage for reference
      sessionStorage.setItem('bot_detection', JSON.stringify({
        isBot: detection.isBot,
        botKind: detection.botKind,
        timestamp: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('[Bot Detection] Error:', error);
      setState({
        isBot: false,
        isLoading: false,
      });
    }
  }, []);

  return (
    <BotDetectionContext.Provider value={state}>
      {children}
    </BotDetectionContext.Provider>
  );
};

