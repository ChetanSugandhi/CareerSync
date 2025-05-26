import React, { useEffect, useState } from 'react';

const History = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/uploads');
        if (!res.ok) throw new Error('Failed to fetch uploads.');
        const data = await res.json();
        setFiles(data);
      } catch (err) {
        console.error('Error fetching uploads:', err);
        setError('⚠️ Could not fetch upload history.');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Upload History</h2>

      {loading ? (
        <p className="text-gray-600">⏳ Loading uploads...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : files.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {files.map((file, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <span className="text-gray-800">{file.name}</span>
              <a
                href={`http://localhost:8080/api/uploads/${file.name}`}
                className="text-indigo-600 hover:underline text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">📂 No uploads found.</p>
      )}
    </div>
  );
};

export default History;
