'use client';

import { Card, CardContent } from '@/components/ui/card';
import { usePlayerContext } from '@/contexts/PlayerContext';
import { Music } from '@/types';
import Image from 'next/image';

const MusicCard = ({ music }: { music: Music }) => {
  const ctx = usePlayerContext();

  return (
    <Card className="w-full h-16" onClick={() => ctx.selectMusic(music)}>
      <CardContent className="flex items-center justify-start p-0 rounded-sm gap-2 overflow-hidden">
        <Image
          className="h-16 w-16"
          src={music.album?.cover ?? ''}
          alt={music.title}
          width="200"
          height="200"
        />
        <span className="text-sm font-semibold line-clamp-2 pr-2 break-all">
          {music.title}
        </span>
      </CardContent>
    </Card>
  );
};

export default MusicCard;
