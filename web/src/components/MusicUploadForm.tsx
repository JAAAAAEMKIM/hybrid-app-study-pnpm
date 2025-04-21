'use client';

import { useState, useEffect } from 'react';
import { Music } from '@/types';

interface MusicUploadFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: Music | null;
}

interface FormData {
  title: string;
  artist: string;
  album: string;
  description: string;
  mp3File: File | null;
  coverImage: File | null;
}

const MusicUploadForm = ({
  onSuccess,
  onCancel,
  initialData,
}: MusicUploadFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    artist: '',
    album: '',
    description: '',
    mp3File: null,
    coverImage: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editMode, setEditMode] = useState(false);

  // 편집 모드인 경우 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setEditMode(true);
      setFormData({
        title: initialData.title || '',
        artist: initialData.artist?.name || '',
        album: initialData.album?.title || '',
        description: initialData.album?.description || '',
        mp3File: null, // 파일은 초기화 불가능
        coverImage: null,
      });

      // 기존 앨범 커버 미리보기 설정
      if (initialData.album?.cover) {
        setPreviewUrl(initialData.album.cover);
      }
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));

      // 이미지 미리보기 생성 (커버 이미지인 경우)
      if (name === 'coverImage') {
        // 기존 미리보기 URL 정리
        if (previewUrl && !previewUrl.startsWith('http')) {
          URL.revokeObjectURL(previewUrl);
        }
        const url = URL.createObjectURL(files[0]);
        setPreviewUrl(url);
      }
    }
  };

  const simulateUpload = () => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 300);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // FormData 객체 생성
      const data = new FormData();
      data.append('title', formData.title);
      data.append('artist', formData.artist);
      data.append('album', formData.album);
      data.append('description', formData.description);

      if (initialData) {
        data.append('id', initialData.id);
      }

      if (formData.mp3File) {
        data.append('mp3File', formData.mp3File);
      }

      if (formData.coverImage) {
        data.append('coverImage', formData.coverImage);
      }

      // 업로드 시뮬레이션
      await simulateUpload();

      // API 호출 (실제 API 구현 필요)
      // const response = await fetch(editMode ? `/api/music/${initialData.id}` : '/api/upload', {
      //   method: editMode ? 'PUT' : 'POST',
      //   body: data,
      // });

      // if (!response.ok) {
      //   throw new Error('업로드에 실패했습니다');
      // }

      // 성공 시 처리
      console.log(editMode ? '편집 성공!' : '업로드 성공!', formData);

      setIsSubmitting(false);
      onSuccess();
    } catch (error) {
      console.error(editMode ? '편집 오류:' : '업로드 오류:', error);
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  // 이미지 미리보기 URL 정리
  const cleanupPreview = () => {
    if (previewUrl && !previewUrl.startsWith('http')) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleCancel = () => {
    cleanupPreview();
    onCancel();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            제목
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="노래 제목"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="artist" className="text-sm font-medium">
            아티스트
          </label>
          <input
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleInputChange}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="아티스트 이름"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="album" className="text-sm font-medium">
          앨범
        </label>
        <input
          id="album"
          name="album"
          value={formData.album}
          onChange={handleInputChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="앨범 이름"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          설명
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="노래에 대한 설명"
          rows={3}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="mp3File" className="text-sm font-medium">
            MP3 파일{' '}
            {editMode && (
              <span className="text-xs text-muted-foreground">
                (변경하지 않으려면 비워두세요)
              </span>
            )}
          </label>
          <input
            id="mp3File"
            name="mp3File"
            type="file"
            accept="audio/mp3"
            onChange={handleFileChange}
            required={!editMode}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="coverImage" className="text-sm font-medium">
            커버 이미지{' '}
            {editMode && (
              <span className="text-xs text-muted-foreground">
                (변경하지 않으려면 비워두세요)
              </span>
            )}
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
          />
        </div>
      </div>

      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">커버 미리보기</p>
          <div className="relative h-32 w-32">
            <img
              src={previewUrl}
              alt="Cover preview"
              className="h-32 w-32 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => {
                cleanupPreview();
                setPreviewUrl(null);
                setFormData((prev) => ({ ...prev, coverImage: null }));
              }}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center"
              aria-label="Remove cover image"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {isSubmitting && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">
            {editMode ? '편집 중...' : '업로드 중...'} {uploadProgress}%
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {isSubmitting
            ? editMode
              ? '편집 중...'
              : '업로드 중...'
            : editMode
            ? '저장'
            : '업로드'}
        </button>
      </div>
    </form>
  );
};

export default MusicUploadForm;
