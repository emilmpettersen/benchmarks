import React from 'react';
import Button from '../ui/Button';

const StartScreen = ({ onStart, children }) => {
  return (
    <>
      {children}
      <Button handleClick={onStart}>Start benchmark</Button>
    </>
  );
};

export default StartScreen;
