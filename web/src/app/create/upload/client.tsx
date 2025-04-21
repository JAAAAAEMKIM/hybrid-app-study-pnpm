'use client';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MusicUploadForm from '@/components/MusicUploadForm';
import { Music } from '@/types';

export default function UploadClient({ data }: { data: Music }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [musicToEdit, setMusicToEdit] = useState<Music | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleBack = () => {
    router.back();
  };

  const handleSuccess = () => {
    // 성공 알림 표시
    alert(musicToEdit ? '편집이 완료되었습니다.' : '업로드가 완료되었습니다.');
    router.back();
  };

  return (
    <>
      <header className="flex items-center gap-2 p-4 sticky top-0 bg-background z-10 border-b">
        <button onClick={handleBack} className="p-2">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
        </button>
        <h1 className="text-xl font-semibold">
          {musicToEdit ? '음악 편집' : '음악 업로드'}
        </h1>
      </header>

      <div className="p-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
            <div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
            <div className="h-20 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
        ) : (
          <MusicUploadForm
            onSuccess={handleSuccess}
            onCancel={handleBack}
            initialData={musicToEdit}
          />
        )}
      </div>
    </>
  );
}
