'use client';

import { uploadMusic } from '@/app/create/upload/actions';
import { Music, Album } from '@/types';

interface MusicUploadFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: Music | null;
  albums: Album[];
}

const MusicUploadForm = ({
  onSuccess,
  onCancel,
  initialData,
  albums,
}: MusicUploadFormProps) => {
  return (
    <form className="space-y-4" action={uploadMusic}>
      <div className="grid grid-cols-0 gap-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            제목
          </label>
          <input
            id="title"
            name="title"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="노래 제목"
            defaultValue={initialData?.title ?? ''}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="albumId" className="text-sm font-medium">
          앨범
        </label>
        <select
          id="albumId"
          name="albumId"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          defaultValue={initialData?.album?.id || ''}
          required
        >
          <option value="" disabled>
            앨범을 선택하세요
          </option>
          {albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.title}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="mp3File" className="text-sm font-medium">
            MP3 파일
          </label>
          <input
            id="mp3File"
            name="mp3File"
            type="file"
            accept="audio/mp3"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
            required={!initialData}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="coverImage" className="text-sm font-medium">
            커버 이미지
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="file"
            accept="image/*"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          취소
        </button>
        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {initialData ? '저장' : '업로드'}
        </button>
      </div>
    </form>
  );
};

export default MusicUploadForm;
