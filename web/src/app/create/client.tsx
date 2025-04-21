'use client';

import { Badge } from '@/components/ui/badge';
import MusicItem from '@/components/MusicItem';
import { Music } from '@/types';
import { useState, useEffect, useCallback } from 'react';
import UploadButton from '@/components/UploadButton';
import UploadModal from '@/components/UploadModal';
import { usePlayerContext } from '@/contexts/PlayerContext';

export default function CreateClient({ data }: { data: Music[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myMusic, setMyMusic] = useState<Music[]>([]);
  const [musicToDelete, setMusicToDelete] = useState<Music | null>(null);
  const [musicToEdit, setMusicToEdit] = useState<Music | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const playerContext = usePlayerContext();

  const handleEditMusic = (music: Music) => {
    setMusicToEdit(music);
    setIsModalOpen(true);
  };

  const handleDeleteMusic = (music: Music) => {
    setMusicToDelete(music);
    setIsDeleteConfirmOpen(true);
  };

  const handlePlayMusic = (music: Music) => {
    // PlayerContext를 통해 재생 구현
    playerContext.selectMusic(music);
  };

  const confirmDelete = async () => {
    if (!musicToDelete) return;

    try {
      // 실제 API 호출
      // await fetch(`/api/music/${musicToDelete.id}`, {
      //   method: 'DELETE',
      // });

      // 임시로 상태만 업데이트
      setMyMusic((prev) => prev.filter((item) => item.id !== musicToDelete.id));

      alert(`"${musicToDelete.title}" 음악이 삭제되었습니다.`);
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('음악을 삭제하는데 문제가 발생했습니다.');
    }

    setIsDeleteConfirmOpen(false);
    setMusicToDelete(null);
  };

  const handleUploadSuccess = () => {
    setIsModalOpen(false);
    setMusicToEdit(null);

    alert('음악이 성공적으로 업로드되었습니다.');

    // 목록 새로고침 로직
    // 실제 구현에서는 새로운 데이터를 불러오거나 응답된 데이터를 목록에 추가
  };

  return (
    <>
      <header className="flex flex-col gap-2 overscroll-none p-4 sticky top-0 bg-background z-10">
        <div className="flex gap-2 items-center">
          <Badge className="rounded-full size-8 bg-amber-400">재</Badge>
          <span className="text-xl font-semibold">Create</span>
          <div className="ml-auto">
            <UploadButton
              onClick={() => {
                setMusicToEdit(null);
                setIsModalOpen(true);
              }}
            />
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
        ) : myMusic.length > 0 ? (
          <div className="space-y-4">
            {myMusic.map((music) => (
              <MusicItem
                key={music.id}
                music={music}
                onEdit={handleEditMusic}
                onDelete={handleDeleteMusic}
                onPlay={handlePlayMusic}
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

      {/* 업로드 모달 (웹 환경용) */}
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setMusicToEdit(null);
        }}
        onSuccess={handleUploadSuccess}
        musicToEdit={musicToEdit}
      />

      {/* 삭제 확인 다이얼로그 */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">
              정말 삭제하시겠습니까?
            </h3>
            <p className="text-muted-foreground mb-4">
              "{musicToDelete?.title}" 음악을 삭제하면 복구할 수 없습니다. 이
              작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 border rounded-md"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
