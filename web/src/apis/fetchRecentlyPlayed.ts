import apiClient from '@/apis/apiClient';
import { shuffle } from '@/lib/utils';

export const fetchRecentlyPlayed = async () => {
  const res = await apiClient()
    .from('Tracks')
    .select(
      `
      *,
      album:Albums (
        *,
        artist:Artists (
          *
        )
      )
    `
    );

  if (!res.data) return [];
  shuffle(res.data);

  return res.data.slice(0, 8).map((track) => {
    return {
      track: {
        ...track,
        artist: track.album.artist,
      },
      played_at: 1234,
    };
  });
};
