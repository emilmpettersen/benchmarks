import React, { useRef, useState } from 'react';
import Button from '../../ui/Button';
import Timer from './Timer';
import { useLocalStorageArray } from '../../utility/useLocalStorageArray';
import TestFinished from '../../components/TestFinished';

const NumberMemory = () => {
  const [currentNumber, setCurrentNumber] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [numberVisible, setNumberVisible] = useState(false);
  const currentRound = useRef(0);
  const score = currentRound.current - 1;
  const [numberHistory, addResult, clearHistory] = useLocalStorageArray('numberMemory');

  const startTest = () => {
    currentRound.current = 0;
    newRound();
    setUserInput('');
    setIsActive(true);
  };

  const newRound = () => {
    currentRound.current++;
    let number = '';

    // generate a random digit between 0 and 9 for each round, and store it as a string
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
    setIsActive(false);
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
        <form onSubmit={checkNumber}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            autoFocus
            className="p-4 border-sky-800 border-2 bg-sky-600 rounded-lg text-3xl"
          />
        </form>
      ) : currentRound.current > 0 ? (
        <TestFinished result={score} tryAgain={startTest} addResult={addResult}>
          <h1 className="text-3xl">You remembered {score} digits</h1>
        </TestFinished>
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
