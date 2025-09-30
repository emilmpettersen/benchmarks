import React from 'react';

const Target = ({ position, handleTargetClick }) => {
  return (
    <div
      className={`w-[100px] h-[100px] absolute rounded-full bg-green-400`}
      style={{ left: position.x, top: position.y }}
      onClick={handleTargetClick}
    ></div>
  );
};

export default Target;
