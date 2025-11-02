import type { UserType } from '../types/license';

export interface UserTypeOption {
  value: UserType;
  label: string;
  description?: string;
}

export const userTypes: UserTypeOption[] = [
  { value: 'producer', label: 'Producer' },
  { value: 'beatmaker', label: 'Beatmaker' },
  { value: 'musician', label: 'Musician' },
  { value: 'songwriter', label: 'Songwriter' },
  { value: 'content-creator', label: 'Content Creator' },
  { value: 'podcaster', label: 'Podcaster' },
  { value: 'video-creator', label: 'Video Creator' },
  { value: 'game-developer', label: 'Game Developer' },
  { value: 'film-producer', label: 'Film Producer' },
  { value: 'advertising-agency', label: 'Advertising Agency' },
  { value: 'streamer', label: 'Streamer' },
  { value: 'sample-pack-creator', label: 'Sample Pack Creator' },
  { value: 'record-label', label: 'Record Label' },
  { value: 'music-publisher', label: 'Music Publisher' },
  { value: 'artist-manager', label: 'Artist Manager' },
  { value: 'hobbyist', label: 'Hobbyist/Student' },
];

