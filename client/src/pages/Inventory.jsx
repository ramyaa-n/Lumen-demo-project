import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';

const Inventory = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Mock data for telecom equipment
  const mockAssets = [
    { id: 1, name: 'Router A', type: 'Router', status: 'Active', location: 'Data Center 1' },
    { id: 2, name: 'Switch B', type: 'Switch', status: 'Inactive', location: 'Office 201' },
    { id: 3, name: 'Firewall C', type: 'Firewall', status: 'Maintenance', location: 'Data Center 2' },
    { id: 4, name: 'Router D', type: 'Router', status: 'Active', location: 'Data Center 1' },
  ];

  // Fetch assets on component mount
  useEffect(() => {
    // TODO: Implement backend API call to fetch assets
    setAssets(mockAssets);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleAddAsset = () => {
    setSelectedAsset(null);
    setIsModalOpen(true);
  };

  const handleEditAsset = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleDeleteAsset = (assetId) => {
    // TODO: Implement backend API call to delete asset
    setAssets(assets.filter(asset => asset.id !== assetId));
  };

  const handleSaveAsset = (asset) => {
    if (asset.id) {
      // TODO: Implement backend API call to update asset
      setAssets(assets.map(a => (a.id === asset.id ? asset : a)));
    } else {
      // TODO: Implement backend API call to add new asset
      const newAsset = { ...asset, id: Date.now() };
      setAssets([...assets, newAsset]);
    }
  };

  const filteredAssets = assets
    .filter(asset =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(asset => statusFilter === 'All' || asset.status === statusFilter);

  const columns = ['name', 'type', 'status', 'location'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name, type, or location"
          className="w-1/3 p-2 border rounded"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={handleFilterChange}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Maintenance">Maintenance</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddAsset}
        >
          Add Asset
        </button>
      </div>
      <Table
        columns={columns}
        data={filteredAssets}
        onEdit={handleEditAsset}
        onDelete={handleDeleteAsset}
      />
      {isModalOpen && (
        <Modal
          asset={selectedAsset}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveAsset}
        />
      )}
    </div>
  );
};

export default Inventory;
