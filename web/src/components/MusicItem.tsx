'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Music } from '@/types';
import {
  faEllipsisVertical,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Portal } from '@/components/Portal';
import { useRouter } from 'next/navigation';

interface MusicItemProps {
  music: Music;
  onEdit: (music: Music) => void;
  onDelete: (music: Music) => void;
  onPlay: (music: Music) => void;
}

const MusicItem = ({ music, onEdit, onDelete, onPlay }: MusicItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴의 위치를 계산하는 함수
  const getMenuPosition = () => {
    if (!buttonRef.current) return { top: 0, left: 0 };

    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.right - 150 + window.scrollX, // 메뉴 너비를 고려하여 위치 조정
    };
  };

  // outside click과 ESC 키 이벤트 처리
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isMenuOpen]);

  const handleMusicClick = () => {
    onPlay(music);
  };

  const router = useRouter();
  const handleEdit = (e: React.MouseEvent) => {
    router.push(`/create/upload/${music.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(music);
    setIsMenuOpen(false);
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  // 메뉴의 현재 위치 계산
  const menuPosition = getMenuPosition();

  return (
    <Card className="w-full h-20 relative" onClick={handleMusicClick}>
      <CardContent className="flex items-center justify-start p-0 rounded-sm gap-2 overflow-hidden h-full">
        <Image
          className="h-20 w-20 object-cover"
          src={music.album?.cover ?? '/placeholder-cover.jpg'}
          alt={music.title}
          width={200}
          height={200}
        />
        <div className="flex flex-col py-2 flex-1 pr-10">
          <span className="text-sm font-semibold line-clamp-1 break-all">
            {music.title}
          </span>
          <span className="text-xs text-muted-foreground line-clamp-1">
            {music.artist?.name}
          </span>
          <span className="text-xs text-muted-foreground line-clamp-1">
            앨범: {music.album?.title || '정보 없음'}
          </span>
        </div>

        <div
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            ref={buttonRef}
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full"
            onClick={toggleMenu}
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} className="h-4 w-4" />
          </Button>

          {isMenuOpen && (
            <Portal>
              <div
                ref={menuRef}
                className="fixed bg-background rounded-md shadow-lg border z-50"
                style={{
                  top: `${menuPosition.top}px`,
                  left: `${menuPosition.left}px`,
                  width: '150px',
                }}
              >
                <button
                  className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent"
                  onClick={handleEdit}
                >
                  <FontAwesomeIcon icon={faPencil} className="mr-2 h-4 w-4" />
                  <span>편집</span>
                </button>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-destructive hover:bg-accent"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2 h-4 w-4" />
                  <span>삭제</span>
                </button>
              </div>
            </Portal>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicItem;
