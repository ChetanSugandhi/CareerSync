import React, { useState } from 'react';
// Upload box for performance files (PDF, image).
const ChartUploader = () => {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      console.log('Uploading chart:', file.name);
      // Add upload logic
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-md w-full max-w-lg mx-auto mt-10">
      <h2 className="text-lg font-semibold text-indigo-700 mb-4">Upload Performance Chart</h2>
      <input
        type="file"
        accept=".png, .jpg, .jpeg, .pdf"
        onChange={handleUpload}
        className="w-full mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Upload
      </button>
    </div>
  );
};

export default ChartUploader;
