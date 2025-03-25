'use client';

import { Card, CardContent } from '@/components/ui/card';
import { usePlayerContext } from '@/contexts/PlayerContext';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const Player = () => {
  const ctx = usePlayerContext();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (ctx.isPlaying) {
        console.log('Playing audio');
        audioRef.current
          .play()
          .catch((err) => console.error('Audio play failed:', err));
      } else {
        console.log('Pause');
        audioRef.current.pause();
      }
    }
  }, [ctx.currentSong, ctx.isPlaying]);

  const onPlay = () => {
    if (ctx.isPlaying) {
      audioRef.current?.pause();
      ctx.pause();
    } else {
      audioRef.current?.play();
      ctx.play();
    }
  };

  if (!ctx.currentSong) return;

  return (
    <aside className="w-full h-16 px-2">
      <Card className="p-0 flex h-16 opacity-90 relative w-full">
        <CardContent className="relative p-2 flex justify-between w-full">
          <div className="flex gap-2 align-middle">
            <Image
              className="rounded-sm"
              src={ctx.currentSong?.album?.cover ?? ''}
              alt={ctx.currentSong?.title ?? ''}
              height={48}
              width={48}
            />
            <div className="flex flex-col justify-center">
              <div className="text-sm font-semibold">
                {ctx.currentSong?.title}
              </div>
              <div className="text-sm">{ctx.currentSong.artist?.name}</div>
            </div>
          </div>
          <button
            onClick={onPlay}
            disabled={!ctx.currentSong}
            className="disabled:opacity-30 px-4"
          >
            <FontAwesomeIcon
              className="text-2xl"
              icon={ctx.isPlaying ? faPause : faPlay}
              width={16}
            />
          </button>
          <div className="absolute bottom-0 w-[calc(100%-16px)] bg-gray-500 h-0.5 rounded-full">
            <div
              className="bg-blue-500 h-0.5 transition-transform origin-left rounded-full"
              style={{ transform: `scale(${ctx.progress}%, 1)` }}
            />
          </div>
        </CardContent>
        <audio
          className="hidden"
          ref={audioRef}
          src={`http://localhost:3001/assets/${
            Number(ctx.currentSong.id) % 9
          }.mp3`}
          controls
          onEnded={() => {
            ctx.selectMusic(null);
            ctx.setIsPlaying(false);
          }}
          onTimeUpdate={() =>
            audioRef.current &&
            ctx.setProgress(
              (audioRef.current.currentTime / audioRef.current.duration) * 100
            )
          }
        />
      </Card>
    </aside>
  );
};
export default Player;
