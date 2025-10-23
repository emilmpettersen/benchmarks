import React from 'react';
import Life from './Life';

const LifeCounter = ({ lives }) => {
  const totalLives = 3;
  return (
    <div className="flex flex-row gap-4 text-3xl m-4 text-red-600">
      {Array.from({ length: totalLives }).map((_, i) => (
        <Life key={i} filled={lives > i} />
      ))}
    </div>
  );
};

export default LifeCounter;
