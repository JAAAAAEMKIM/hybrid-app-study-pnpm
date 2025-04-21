'use client';

import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import MusicUploadForm from './MusicUploadForm';
import { Music, Album } from '@/types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  musicToEdit?: Music | null;
  albums: Album[];
}

const UploadModal = ({
  isOpen,
  onClose,
  onSuccess,
  musicToEdit,
  albums,
}: UploadModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-black/50 fixed inset-0" onClick={onClose}></div>
        <div className="relative bg-background rounded-lg shadow-lg max-w-[500px] w-full max-h-[90vh] overflow-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {musicToEdit ? '음악 편집' : '음악 업로드'}
            </h2>
            <MusicUploadForm
              onSuccess={onSuccess}
              onCancel={onClose}
              initialData={musicToEdit}
              albums={albums}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UploadModal;
