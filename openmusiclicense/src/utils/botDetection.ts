/**
 * Simple client-side bot detection based on user agent and behavioral patterns
 */
export const detectBot = (): { isBot: boolean; botKind?: string } => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Common bot patterns
  const botPatterns = [
    { pattern: /googlebot|google-inspectiontool/i, kind: 'Googlebot' },
    { pattern: /bingbot/i, kind: 'Bingbot' },
    { pattern: /slurp/i, kind: 'Yahoo' },
    { pattern: /duckduckbot/i, kind: 'DuckDuckGo' },
    { pattern: /baiduspider/i, kind: 'Baidu' },
    { pattern: /yandexbot/i, kind: 'Yandex' },
    { pattern: /facebookexternalhit/i, kind: 'Facebook' },
    { pattern: /twitterbot/i, kind: 'Twitter' },
    { pattern: /linkedinbot/i, kind: 'LinkedIn' },
    { pattern: /whatsapp/i, kind: 'WhatsApp' },
    { pattern: /telegrambot/i, kind: 'Telegram' },
    { pattern: /slackbot/i, kind: 'Slack' },
    { pattern: /discordbot/i, kind: 'Discord' },
    { pattern: /bot|crawler|spider|crawling/i, kind: 'Generic Bot' },
    { pattern: /headless|phantom|selenium|puppeteer/i, kind: 'Automation' },
  ];

  for (const { pattern, kind } of botPatterns) {
    if (pattern.test(userAgent)) {
      return { isBot: true, botKind: kind };
    }
  }

  // Check for webdriver flag
  if (navigator.webdriver) {
    return { isBot: true, botKind: 'WebDriver' };
  }

  return { isBot: false };
};

