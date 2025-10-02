import React, { useEffect, useRef, useState } from 'react';
import Button from '../../ui/Button';
import Timer from './Timer';
import { useLocalStorageArray } from '../../utility/useLocalStorageArray';

const NumberMemory = () => {
  const [currentNumber, setCurrentNumber] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [numberVisible, setNumberVisible] = useState(false);
  const inputRef = useRef(null);
  const currentRound = useRef(0);
  const [numberHistory, addResult, clearHistory] = useLocalStorageArray('numberMemory');

  const startTest = () => {
    newRound();
    setIsActive(true);
  };

  const saveScore = () => {
    addResult(currentRound.current);
  };

  const newRound = () => {
    currentRound.current++;
    let number = '';
    for (let i = 0; i < currentRound.current; i++) {
      number = number + parseInt(Math.floor(Math.random() * 10));
    }
    setCurrentNumber(number);
    setNumberVisible(true);
    setTimeout(() => {
      setNumberVisible(false);
    }, 5000);
  };

  const gameOver = () => {
    alert('You failed at ' + currentRound.current + ' digits');
  };

  const checkNumber = () => {
    if (userInput === currentNumber) {
      newRound();
      setUserInput('');
    } else {
      gameOver();
    }
  };

  return (
    <div className="flex w-full h-[80dvh] bg-sky-800 justify-center items-center flex-col gap-4">
      {isActive && numberVisible ? (
        <>
          <h1 className="text-5xl">{currentNumber}</h1>
          <Timer />
        </>
      ) : isActive && !numberVisible ? (
        <>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            autoFocus
            ref={inputRef}
          />
          <Button handleClick={checkNumber}>Submit</Button>
        </>
      ) : (
        <>
          <h1 className="text-3xl ">How many numbers can you remember?</h1>
          <p>Each round will add another digit for you to remember.</p>
          <Button handleClick={startTest}>Start</Button>
        </>
      )}
    </div>
  );
};

export default NumberMemory;
