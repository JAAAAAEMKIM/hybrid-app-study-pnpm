import { fetchAlbums } from '@/apis/fetchAlbums';
import { fetchMusicById } from '@/apis/fetchMusicById';
import UploadClient from '@/app/create/upload/client';
import { Album } from '@/types';

export default async function Page({ params }) {
  const { id } = await params;
  const data = await fetchMusicById(id);
  const albums: Album[] = await fetchAlbums();

  return <UploadClient data={data} albums={albums} />;
}
