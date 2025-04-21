import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import { uploadAlbum } from '@/app/create/album/actions';

interface AlbumUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AlbumUploadModal = ({
  isOpen,
  onClose,
  onSuccess,
}: AlbumUploadModalProps) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image!);
    formData.append('release_date', releaseDate);
    formData.append('description', description);
    try {
      await uploadAlbum(formData);
      onSuccess();
      onClose();
    } catch (err) {
      alert('앨범 업로드에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-black/50 fixed inset-0" onClick={onClose}></div>
        <div className="relative bg-background rounded-lg shadow-lg max-w-[500px] w-full max-h-[90vh] overflow-auto">
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">앨범 업로드</h2>
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
                onClick={onClose}
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
                업로드
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default AlbumUploadModal;
