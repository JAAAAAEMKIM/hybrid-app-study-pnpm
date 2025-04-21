import { fetchMusicById } from '@/apis/fetchMusicById';
import UploadClient from '@/app/create/upload/client';

export default async function Page() {
  const musicId = 'id';
  const data = musicId ? await fetchMusicById(musicId) : null;

  return <UploadClient data={data} />;
}
