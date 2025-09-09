import React from 'react';
import Card from '../components/Card';
import Table from '../components/Table';

const Dashboard = () => {
  // Mock data - in a real app, this would come from an API
  const assets = [
    { id: 1, name: 'Router A', type: 'Router', status: 'Active', location: 'Data Center 1', modified: '2025-09-08' },
    { id: 2, name: 'Switch B', type: 'Switch', status: 'Inactive', location: 'Office 201', modified: '2025-09-07' },
    { id: 3, name: 'Firewall C', type: 'Firewall', status: 'Maintenance', location: 'Data Center 2', modified: '2025-09-08' },
    { id: 4, name: 'Router D', type: 'Router', status: 'Active', location: 'Data Center 1', modified: '2025-09-06' },
    { id: 5, name: 'Access Point E', type: 'WiFi', status: 'Active', location: 'Office 305', modified: '2025-09-05' },
  ];

  const totalAssets = assets.length;
  const activeAssets = assets.filter(asset => asset.status === 'Active').length;
  const maintenanceAssets = assets.filter(asset => asset.status === 'Maintenance').length;
  const inactiveAssets = assets.filter(asset => asset.status === 'Inactive').length;

  const recentActivity = assets.sort((a, b) => new Date(b.modified) - new Date(a.modified)).slice(0, 5);
  const columns = ['name', 'type', 'status', 'location', 'modified'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card title="Total Assets">
          <p className="text-3xl font-bold">{totalAssets}</p>
        </Card>
        <Card title="Active Assets">
          <p className="text-3xl font-bold text-green-500">{activeAssets}</p>
        </Card>
        <Card title="Assets in Maintenance">
          <p className="text-3xl font-bold text-yellow-500">{maintenanceAssets}</p>
        </Card>
        <Card title="Inactive Assets">
          <p className="text-3xl font-bold text-red-500">{inactiveAssets}</p>
        </Card>
      </div>

      {/* Recent Activity */}
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <Table
          columns={columns}
          data={recentActivity}
          onEdit={() => alert('Edit functionality not implemented for this view.')}
          onDelete={() => alert('Delete functionality not implemented for this view.')}
        />
      </div>
    </div>
  );
};

export default Dashboard;