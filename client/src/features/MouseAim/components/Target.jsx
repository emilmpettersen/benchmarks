import React from 'react';
import { SiTarget } from 'react-icons/si';
const Target = ({ position, handleTargetClick }) => {
  return (
    <div
      className={`w-[100px] h-[100px] absolute rounded-full flex items-center justify-center cursor-pointer overflow-hidden`}
      style={{ left: position.x, top: position.y }}
      onClick={handleTargetClick}
    >
      <SiTarget className="text-9xl text-red-500" />
    </div>
  );
};

export default Target;
