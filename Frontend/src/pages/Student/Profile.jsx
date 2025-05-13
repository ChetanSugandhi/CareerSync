import React, { useState } from 'react';

const Profile = () => {
  const [resume, setResume] = useState(null);

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      
      {/* Basic Info */}
      <div className="mb-6">
        <p><strong>Name:</strong> Katari Sree Lasya</p>
        <p><strong>Email:</strong> sree@example.com</p>
        <p><strong>Branch:</strong> CSE</p>
      </div>

      {/* Resume Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Upload Resume:</label>
        <input type="file" onChange={handleResumeUpload} className="border p-2" />
        {resume && <p className="mt-2 text-green-600">Uploaded: {resume.name}</p>}
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Skills</h3>
        <ul className="flex gap-2 flex-wrap">
          <li className="bg-blue-200 px-3 py-1 rounded">React</li>
          <li className="bg-blue-200 px-3 py-1 rounded">Tailwind CSS</li>
          <li className="bg-blue-200 px-3 py-1 rounded">Node.js</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
