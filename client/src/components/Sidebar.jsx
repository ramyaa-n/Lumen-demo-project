import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Lumen</h2>
      <ul>
        <li className="mb-2">
          <Link to="/" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link>
        </li>
        <li className="mb-2">
          <Link to="/inventory" className="block p-2 rounded hover:bg-gray-700">Inventory</Link>
        </li>
        <li className="mb-2">
          <Link to="/requests" className="block p-2 rounded hover:bg-gray-700">Requests</Link>
        </li>
        <li className="mb-2">
          <Link to="/assignment" className="block p-2 rounded hover:bg-gray-700">Asset Assignment</Link>
        </li>
        <li className="mb-2">
          <Link to="/reports" className="block p-2 rounded hover:bg-gray-700">Reports</Link>
        </li>
        <li className="mb-2">
          <Link to="/users" className="block p-2 rounded hover:bg-gray-700">User Management</Link>
        </li>
        <li className="mb-2">
          <Link to="/settings" className="block p-2 rounded hover:bg-gray-700">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
