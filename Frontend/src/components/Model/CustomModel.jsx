import React from 'react';
// CustomModal.jsx: Reusable modal with dynamic content and title.
const CustomModel = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4">{title}</h3>
        <div>{children}</div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CustomModel;
