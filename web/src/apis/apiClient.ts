import SupabaseApiClient from '@/apis/SupabaseApiClient';

const apiClient = () => {
  return SupabaseApiClient.getInstance();
};

export default apiClient;
