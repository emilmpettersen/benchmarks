import React from 'react';
import Timer from './Timer';

const NumberDisplay = ({ currentNumberRef, timerDuration }) => {
  return (
    <>
      <h1 className="text-5xl select-none pointer-events-none">{currentNumberRef.current}</h1>
      <Timer duration={timerDuration} />
    </>
  );
};

export default NumberDisplay;
