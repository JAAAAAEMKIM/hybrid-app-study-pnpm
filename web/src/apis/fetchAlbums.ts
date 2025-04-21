import apiClient from '@/apis/apiClient';

export const fetchAlbums = async () => {
  const res = await apiClient().from('Albums').select(`*`);

  if (!res.data) {
    throw new Error('Data Fetching Error');
  }

  return res.data;
};
