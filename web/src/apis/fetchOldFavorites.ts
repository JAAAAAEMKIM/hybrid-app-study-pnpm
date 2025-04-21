import apiClient from '@/apis/apiClient';

export const fetchOldFavorites = async () => {
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
    )
    .order('id', { ascending: false })
    .limit(12);

  if (!res.data) return [];

  return res.data.map((track) => {
    return {
      track: {
        ...track,
        artist: track.album.artist,
      },
      last_played: 1234,
    };
  });
};
