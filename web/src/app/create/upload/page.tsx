import { fetchAlbums } from '@/apis/fetchAlbums';
import { Album } from '@/types';
import UploadClient from '@/app/create/upload/client';

export default async function Create() {
  const albums: Album[] = await fetchAlbums();
  return <UploadClient albums={albums} />;
}
