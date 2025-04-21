'use client';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Music } from '@/types';

interface UploadButtonProps {
  onClick: () => void;
  musicToEdit?: Music | null;
}

const UploadButton = ({ onClick, musicToEdit }: UploadButtonProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 모바일 환경 감지 로직
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleClick = () => {
    if (isMobile) {
      // 모바일에서는 새 페이지로 이동
      if (musicToEdit) {
        // 편집 모드에서는 ID 파라미터 추가
        router.push(`/create/upload?id=${musicToEdit.id}`);
      } else {
        router.push('/create/upload');
      }
    } else {
      // 웹에서는 모달 표시
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center"
      aria-label={musicToEdit ? 'Edit music' : 'Upload music'}
    >
      <FontAwesomeIcon icon={faPlus} className="text-xl" />
    </button>
  );
};

export default UploadButton;
