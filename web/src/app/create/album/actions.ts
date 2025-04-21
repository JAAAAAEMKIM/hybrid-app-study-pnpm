'use server';

import apiClient from '@/apis/apiClient';
import { signin } from '@/apis/signin';
import { revalidatePath } from 'next/cache';

export async function uploadAlbum(formData: FormData) {
  try {
    await signin();
    const title = formData.get('title') as string;
    const release_date = formData.get('release_date') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;

    // 1. 유저 정보 가져오기 (로그인 필요)
    const { data: userData, error: userError } =
      await apiClient().auth.getUser();
    if (userError || !userData?.user?.id) {
      console.error('로그인 에러:', userError);
      throw new Error('로그인 필요');
    }
    const userId = userData.user.id;
    console.log('인증된 사용자 ID:', userId);

    // 2. 이미지 파일 Supabase Storage에 업로드
    // 파일명에서 확장자 추출
    const fileExt = imageFile.name.split('.').pop();
    // 고유한 파일 경로 생성: albums/사용자ID/타임스탬프_원본파일명
    const timestamp = new Date().getTime();
    const sanitizedFileName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // 특수문자 제거
    const filePath = `albums/${userId}/${timestamp}_${sanitizedFileName}`;

    console.log(await apiClient().storage.listBuckets());
    const imageBucket = apiClient().storage.from('image');
    console.log(imageBucket);
    imageBucket.upload;

    const { data: storageData, error: storageError } = await imageBucket.upload(
      filePath,
      imageFile,
      { upsert: true }
    );
    if (storageError) {
      console.error('이미지 업로드 에러:', storageError);
      throw storageError;
    }
    console.log('이미지 업로드 성공:', filePath);

    // 3. public URL 생성
    const { data: publicUrlData } = apiClient()
      .storage.from('image')
      .getPublicUrl(filePath);
    const coverUrl = publicUrlData?.publicUrl;
    console.log('이미지 URL:', coverUrl);

    // 4. DB에 앨범 정보 저장
    const albumData = {
      title,
      cover: coverUrl,
      release_date,
      description,
      artistId: 1,
    };
    console.log('삽입 시도할 앨범 데이터:', albumData);

    // RLS 정책 문제 디버깅을 위해 세션 정보 확인
    const { data: sessionData } = await apiClient().auth.getSession();
    console.log(
      '현재 세션 상태:',
      sessionData?.session ? '세션 있음' : '세션 없음'
    );

    const { data: insertData, error: insertError } = await apiClient()
      .from('Albums')
      .insert(albumData)
      .select();
    if (insertError) {
      console.error('앨범 저장 에러:', insertError);
      throw insertError;
    }

    console.log('앨범 저장 성공:', insertData);
    revalidatePath('/create');
    return { success: true, data: insertData };
  } catch (error) {
    console.error('앨범 업로드 실패:', error);
    return { success: false, error };
  }
}
