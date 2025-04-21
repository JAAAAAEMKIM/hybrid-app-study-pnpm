import apiClient from '@/apis/apiClient';
import { signin } from '@/apis/signin';

export const fetchMyMusics = async () => {
  await signin();
  const id = (await apiClient().auth.getUser()).data.user?.id ?? '';

  console.log(id);
  const res = await apiClient()
    .from('Uploads')
    .select(
      `*, track: Tracks(
        *,
        album: Albums (*)
      )`
    )
    .eq('userId', id);

  console.log(res);

  if (!res.data) {
    throw new Error('Data Fetching Error');
  }

  return res.data.map((music) => ({
    ...music.track,
    artist: music.track.album.artist,
    album: music.track.album,
  }));
};
