import React from 'react';
import Button from '../../../ui/Button';

const StartScreen = ({ onStart }) => {
  return (
    <>
      <h1 className="text-3xl ">How many numbers can you remember?</h1>
      <p>Each round will add another digit for you to remember.</p>
      <Button handleClick={onStart}>Start</Button>
    </>
  );
};

export default StartScreen;
