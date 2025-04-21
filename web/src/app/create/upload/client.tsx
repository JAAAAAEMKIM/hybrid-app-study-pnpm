'use client';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MusicUploadForm from '@/components/MusicUploadForm';
import { Album, Music } from '@/types';

interface UploadClientProps {
  data?: Music;
  albums: Album[];
}

export default function UploadClient({ data, albums }: UploadClientProps) {
  console.log(data);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const handleSuccess = () => {
    // 성공 알림 표시
    alert(data ? '편집이 완료되었습니다.' : '업로드가 완료되었습니다.');
    router.back();
  };

  return (
    <>
      <header className="flex items-center gap-2 p-4 sticky top-0 bg-background z-10 border-b">
        <button onClick={handleBack} className="p-2">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
        </button>
        <h1 className="text-xl font-semibold">
          {data ? '음악 편집' : '음악 업로드'}
        </h1>
      </header>

      <div className="p-4">
        <MusicUploadForm
          onSuccess={handleSuccess}
          onCancel={handleBack}
          initialData={data}
          albums={albums}
        />
      </div>
    </>
  );
}
