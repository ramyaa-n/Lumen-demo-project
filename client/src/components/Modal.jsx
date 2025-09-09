import React, { useState, useEffect } from 'react';

const Modal = ({ asset, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...asset });

  useEffect(() => {
    setFormData({ ...asset });
  }, [asset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-1/3">
        <h2 className="text-xl font-bold mb-4">{asset && asset.id ? 'Edit Asset' : 'Add Asset'}</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded"
            value={formData.name || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            className="w-full p-2 border rounded"
            value={formData.type || ''}
            onChange={handleChange}
          />
          <select
            name="status"
            className="w-full p-2 border rounded"
            value={formData.status || 'Active'}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full p-2 border rounded"
            value={formData.location || ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
