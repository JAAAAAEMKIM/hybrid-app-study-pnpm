import apiClient from '@/apis/apiClient';

export const fetchCategories = async () => {
  const res = await apiClient().from('Categories').select(`*`);

  if (!res.data) {
    throw new Error('Data Fetching Error');
  }

  return res.data;
};
