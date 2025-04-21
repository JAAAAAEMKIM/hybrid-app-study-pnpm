'use client';

import { Badge } from '@/components/ui/badge';
import MusicItem from '@/components/MusicItem';
import { Music } from '@/types';
import { useState, useEffect, useRef } from 'react';
import { usePlayerContext } from '@/contexts/PlayerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function CreateClient({ data }: { data: Music[] }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const playerContext = usePlayerContext();
  const router = useRouter();

  const handlePlayMusic = (music: Music) => {
    // PlayerContext를 통해 재생 구현
    playerContext.selectMusic(music);
  };

  const confirmDelete = async () => {};

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <header className="flex flex-col gap-2 overscroll-none p-4 sticky top-0 bg-background z-10">
        <div className="flex gap-2 items-center">
          <Badge className="rounded-full size-8 bg-amber-400">재</Badge>
          <span className="text-xl font-semibold">Create</span>
          <div className="ml-auto relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((v) => !v)}
              className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center"
              aria-label="업로드 메뉴 열기"
            >
              <FontAwesomeIcon icon={faPlus} className="text-xl" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-20 text-black">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push('/create/album');
                  }}
                >
                  앨범 업로드
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push('/create/upload');
                  }}
                >
                  음악 업로드
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">내 음악</h2>

        {0 ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="h-20 w-20 bg-gray-200 animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                  <div className="h-3 w-1/2 bg-gray-200 animate-pulse"></div>
                  <div className="h-3 w-2/3 bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : data.length > 0 ? (
          <div className="space-y-4">
            {data.map((music) => (
              <MusicItem
                key={music.id}
                music={music}
                onPlay={handlePlayMusic}
                onDelete={() => {}}
                onEdit={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              아직 업로드한 음악이 없습니다.
            </p>
            <p className="text-muted-foreground mb-4">
              오른쪽 상단의 업로드 버튼을 눌러 음악을 추가해보세요.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
