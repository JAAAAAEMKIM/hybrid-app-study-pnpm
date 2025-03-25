'use client';

import { Music } from '@/types';
import { createContext, use, useState } from 'react';

const PlayerContext = createContext<{
  currentSong: Music | null;
  selectMusic: (id: Music | null) => void;
  isPlaying: boolean;
  play(): void;
  pause(): void;
  setIsPlaying: (isPlaying: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
}>({
  currentSong: null,
  selectMusic: () => {},
  isPlaying: false,
  play: () => {},
  pause: () => false,
  setIsPlaying: () => {},
  progress: 0,
  setProgress: () => {},
});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Music | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const selectMusic = (music: Music | null) => {
    if (music && currentSong?.id !== music.id) {
      setIsPlaying(true);
      setCurrentSong(music);

      console.log(music.album?.cover);

      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: music.title,
          artist: music.artist?.name,
          album: music.album?.title,
          artwork: [
            {
              src: music.album?.cover ?? '',
              sizes: '96x96',
              type: 'image/jpeg',
            },
            {
              src: 'https://dummyimage.com/128x128',
              sizes: '128x128',
              type: 'image/png',
            },
            {
              src: 'https://dummyimage.com/192x192',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'https://dummyimage.com/256x256',
              sizes: '256x256',
              type: 'image/png',
            },
            {
              src: 'https://dummyimage.com/384x384',
              sizes: '384x384',
              type: 'image/png',
            },
            {
              src: 'https://dummyimage.com/512x512',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        });
      }
    }
  };

  return (
    <PlayerContext
      value={{
        currentSong,
        selectMusic,
        isPlaying,
        play: () => setIsPlaying(true),
        pause: () => setIsPlaying(false),
        setIsPlaying,
        progress,
        setProgress,
      }}
    >
      {children}
    </PlayerContext>
  );
};

export const usePlayerContext = () => use(PlayerContext);

export default PlayerContext;
