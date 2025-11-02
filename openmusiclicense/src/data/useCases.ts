import type { UserType } from '../types/license';

export interface UseCase {
  value: string;
  label: string;
  userTypes: UserType[];
}

export const useCases: UseCase[] = [
  // Producer/Beatmaker
  {
    value: 'sell-beat-exclusive',
    label: 'Sell a beat (exclusive)',
    userTypes: ['producer', 'beatmaker'],
  },
  {
    value: 'lease-beat-non-exclusive',
    label: 'Lease a beat (non-exclusive)',
    userTypes: ['producer', 'beatmaker'],
  },
  {
    value: 'release-sample-pack',
    label: 'Release a sample pack',
    userTypes: ['producer', 'beatmaker', 'sample-pack-creator'],
  },
  {
    value: 'license-production-templates',
    label: 'License production templates',
    userTypes: ['producer', 'beatmaker'],
  },
  {
    value: 'share-stems-multitracks',
    label: 'Share stems/multitracks',
    userTypes: ['producer', 'beatmaker'],
  },
  {
    value: 'distribute-loops-commercially',
    label: 'Distribute loops commercially',
    userTypes: ['producer', 'beatmaker', 'sample-pack-creator'],
  },
  {
    value: 'create-remix-packs',
    label: 'Create remix packs',
    userTypes: ['producer', 'beatmaker'],
  },
  {
    value: 'license-to-sync-libraries',
    label: 'License to sync libraries',
    userTypes: ['producer', 'beatmaker'],
  },
  // Musician/Songwriter
  {
    value: 'purchase-beat-for-recording',
    label: 'Purchase a beat for recording',
    userTypes: ['musician', 'songwriter'],
  },
  {
    value: 'lease-beat-for-release',
    label: 'Lease a beat for release',
    userTypes: ['musician', 'songwriter'],
  },
  {
    value: 'sample-from-pack',
    label: 'Sample from a pack',
    userTypes: ['musician', 'songwriter', 'producer', 'beatmaker'],
  },
  {
    value: 'use-loops-in-production',
    label: 'Use loops in production',
    userTypes: ['musician', 'songwriter', 'producer', 'beatmaker'],
  },
  {
    value: 'create-cover-remix',
    label: 'Create cover/remix',
    userTypes: ['musician', 'songwriter'],
  },
  {
    value: 'release-on-streaming',
    label: 'Release on streaming platforms',
    userTypes: ['musician', 'songwriter', 'record-label'],
  },
  {
    value: 'perform-live',
    label: 'Perform live',
    userTypes: ['musician', 'songwriter'],
  },
  {
    value: 'use-in-music-video',
    label: 'Use in music video',
    userTypes: ['musician', 'songwriter', 'video-creator'],
  },
  // Content Creator/Video Creator
  {
    value: 'background-music-youtube',
    label: 'Background music for YouTube',
    userTypes: ['content-creator', 'video-creator'],
  },
  {
    value: 'podcast-intro-outro',
    label: 'Podcast intro/outro music',
    userTypes: ['podcaster', 'content-creator'],
  },
  {
    value: 'social-media-content',
    label: 'Social media content',
    userTypes: ['content-creator', 'video-creator'],
  },
  {
    value: 'online-course-background',
    label: 'Online course background',
    userTypes: ['content-creator', 'video-creator'],
  },
  {
    value: 'livestream-music',
    label: 'Livestream music',
    userTypes: ['streamer', 'content-creator'],
  },
  {
    value: 'twitch-stream-audio',
    label: 'Twitch stream audio',
    userTypes: ['streamer'],
  },
  {
    value: 'educational-videos',
    label: 'Educational videos',
    userTypes: ['content-creator', 'video-creator'],
  },
  {
    value: 'promotional-videos',
    label: 'Promotional videos',
    userTypes: ['content-creator', 'video-creator', 'advertising-agency'],
  },
  // Film/TV/Game Developer
  {
    value: 'film-soundtrack',
    label: 'Film soundtrack',
    userTypes: ['film-producer'],
  },
  {
    value: 'tv-show-music',
    label: 'TV show music',
    userTypes: ['film-producer'],
  },
  {
    value: 'commercial-advertisement',
    label: 'Commercial/advertisement',
    userTypes: ['advertising-agency', 'film-producer'],
  },
  {
    value: 'video-game-soundtrack',
    label: 'Video game soundtrack',
    userTypes: ['game-developer'],
  },
  {
    value: 'trailer-music',
    label: 'Trailer music',
    userTypes: ['film-producer', 'advertising-agency'],
  },
  {
    value: 'documentary-score',
    label: 'Documentary score',
    userTypes: ['film-producer'],
  },
  {
    value: 'corporate-video',
    label: 'Corporate video',
    userTypes: ['film-producer', 'advertising-agency'],
  },
  {
    value: 'animation-music',
    label: 'Animation music',
    userTypes: ['film-producer', 'game-developer'],
  },
  // Streamer/Podcaster
  {
    value: 'stream-background-music',
    label: 'Stream background music',
    userTypes: ['streamer'],
  },
  {
    value: 'podcast-episode-music',
    label: 'Podcast episode music',
    userTypes: ['podcaster'],
  },
  {
    value: 'intro-outro-themes',
    label: 'Intro/outro themes',
    userTypes: ['podcaster', 'streamer'],
  },
  {
    value: 'transition-music',
    label: 'Transition music',
    userTypes: ['podcaster', 'streamer'],
  },
  {
    value: 'monetized-content',
    label: 'Monetized content',
    userTypes: ['streamer', 'podcaster', 'content-creator'],
  },
  {
    value: 'sponsored-content',
    label: 'Sponsored content',
    userTypes: ['content-creator', 'video-creator'],
  },
  {
    value: 'archive-vod-usage',
    label: 'Archive/VOD usage',
    userTypes: ['streamer', 'podcaster'],
  },
];

export function getUseCasesForUserType(userType: string): UseCase[] {
  if (!userType) return [];
  return useCases.filter((useCase) => useCase.userTypes.includes(userType as any));
}

