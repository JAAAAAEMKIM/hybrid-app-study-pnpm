import apiClient from '@/apis/apiClient';

export const fetchDayBased = async () => {
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

  if (!res.data) {
    throw new Error('Data Fetching Error');
  }

  return res.data.map((track) => {
    return {
      track: {
        ...track,
        artist: track.album.artist,
      },
    };
  });
};
