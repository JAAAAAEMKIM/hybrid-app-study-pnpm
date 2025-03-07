"use client";

import { ChangeEvent, useRef, useState } from "react";

const FileUploadButton = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const handleClick = () => {
    ref.current?.click();
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <>
      <button
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        onClick={handleClick}
      >
        파일 업로드
      </button>
      {file && (
        <div>
          {file.name} {file.size}Bytes
        </div>
      )}
      <input
        ref={ref}
        className="hidden"
        type="file"
        onChange={handleUpload}
        aria-hidden
      />
    </>
  );
};

export default FileUploadButton;
