import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '@/components/FileUpload';

// Store file text in sessionStorage for use in /context and other pages
const Upload: React.FC = () => {
  const navigate = useNavigate();
  const handleFileSelect = (file: File, text: string) => {
    sessionStorage.setItem('uploadedFileText', text);
    sessionStorage.setItem('uploadedFileName', file.name);
    navigate('/context');
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl px-4">
        <FileUpload onFileSelect={handleFileSelect} />
      </div>
    </div>
  );
};

export default Upload;
