import apiClient from '@/apis/apiClient';

export const signin = async () => {
  const data = await apiClient().auth.signInWithPassword({
    email: 'test@nhndooray.com',
    password: 'nhn!@#123',
  });

  return data;
};
