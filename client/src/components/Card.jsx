import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="font-bold mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default Card;
