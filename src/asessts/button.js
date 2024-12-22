import React from 'react';

export const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded w-full"
    >
      {text}
    </button>
  );
};
