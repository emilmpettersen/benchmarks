import React from 'react';

const Button = ({ children, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="p-3 bg-yellow-300 rounded text-yellow-950 cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
