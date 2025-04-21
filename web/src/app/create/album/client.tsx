'use client';

import { uploadAlbum } from './actions';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AlbumClient() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert('이미지를 선택해주세요');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('release_date', releaseDate);
    formData.append('description', description);

    try {
      await uploadAlbum(formData);
      alert('앨범이 성공적으로 업로드되었습니다.');
      router.back();
    } catch (err) {
      console.error('앨범 업로드 오류:', err);
      alert('앨범 업로드에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="flex items-center gap-2 p-4 sticky top-0 bg-background z-10 border-b">
        <button onClick={handleBack} className="p-2">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
        </button>
        <h1 className="text-xl font-semibold">앨범 업로드</h1>
      </header>

      <div className="p-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">앨범명</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="앨범명"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">커버 이미지</label>
            <input
              type="file"
              accept="image/*"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">발매일</label>
            <input
              type="date"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">설명</label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="앨범 설명"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? '업로드 중...' : '업로드'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
