import React, { useState } from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setUploadStatus(`Selected file: ${selectedFile.name}`);
    } else {
      setUploadStatus('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setUploadStatus('❗ Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    setUploadStatus('⏳ Uploading...');

    try {
      const res = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setUploadStatus('✅ File uploaded successfully!');
        setFile(null);
      } else {
        setUploadStatus('❌ Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('⚠️ An error occurred while uploading.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Upload Resume / Certificate</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleFileChange}
          className="mb-4 w-full border p-2 rounded"
        />
        <button
          type="submit"
          className={`w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {uploadStatus && (
        <p className="mt-4 text-sm text-gray-700 font-medium">{uploadStatus}</p>
      )}
    </div>
  );
};

export default Upload;
