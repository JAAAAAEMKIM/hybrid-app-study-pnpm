import apiClient from '@/apis/apiClient';

export const fetchMusicById = async (id: string) => {
  const res = await apiClient().from('Tracks').select(`*`).eq('id', id);

  if (!res.data) {
    throw new Error('Data Fetching Error');
  }

  return res.data;
};
