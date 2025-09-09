import React from 'react';

const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column} className="py-2 px-4 border-b text-left">{column.charAt(0).toUpperCase() + column.slice(1)}</th>
          ))}
          <th className="py-2 px-4 border-b text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            {columns.map(column => (
              <td key={column} className="py-2 px-4 border-b">{item[column]}</td>
            ))}
            <td className="py-2 px-4 border-b">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => onEdit(item)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
