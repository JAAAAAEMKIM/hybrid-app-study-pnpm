import { fetchMyMusics } from '@/apis/fetchMyMusics';
import CreateClient from '@/app/create/client';

export default async function Create() {
  const data = await fetchMyMusics();

  return <CreateClient data={data} />;
}
