'use server';

import { revalidatePath } from 'next/cache';
import apiClient from '@/apis/apiClient';
import { signin } from '@/apis/signin';

export async function uploadMusic(formData: FormData) {
  await signin();
  const title = formData.get('title') as string;
  const mp3File = formData.get('mp3File') as File;
  const albumId = formData.get('albumId') as string;

  // 1. 유저 정보 가져오기
  const { data: userData, error: userError } = await apiClient().auth.getUser();
  if (userError || !userData?.user?.id) throw new Error('로그인 필요');
  const userId = userData.user.id;

  // 2. mp3 파일 Supabase Storage에 업로드
  const filePath = `${userId}/${Date.now()}_${mp3File.name}`;
  const { data: storageData, error: storageError } = await apiClient()
    .storage.from('music')
    .upload(filePath, mp3File, { upsert: true });
  if (storageError) throw storageError;

  // 3. public URL 생성
  const { data: publicUrlData } = apiClient()
    .storage.from('music')
    .getPublicUrl(filePath);
  const fileUrl = publicUrlData.publicUrl;

  // 4. Tracks 테이블에 insert
  const { data: trackData, error: trackError } = await apiClient()
    .from('Tracks')
    .insert({
      title,
      src: fileUrl,
      albumId,
    })
    .select()
    .single();
  if (trackError) throw trackError;

  // 5. Uploads 테이블에 insert
  const { error: uploadsError } = await apiClient().from('Uploads').insert({
    trackId: trackData.id,
    userId,
  });
  if (uploadsError) throw uploadsError;

  // 업로드 후 목록 갱신 등 필요시
  revalidatePath('/create');
}
