import React, { useRef, useState } from 'react';
import { useLocalStorageArray } from '../../utility/useLocalStorageArray';
import TestFinished from '../../components/TestFinished';
import NumberDisplay from './components/NumberDisplay';
import NumberInput from './components/NumberInput';
import StartScreen from './components/StartScreen';

const NumberMemory = () => {
  const [isActive, setIsActive] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [numberVisible, setNumberVisible] = useState(false);
  const currentNumberRef = useRef('');
  const roundRef = useRef(0);
  const score = roundRef.current - 1;
  const timerDuration = 5000;
  const [numberHistory, addResult, clearHistory] = useLocalStorageArray('numberMemory');

  const startTest = () => {
    roundRef.current = 0;
    newRound();
    setUserInput('');
    setIsActive(true);
  };

  const newRound = () => {
    roundRef.current++;
    let number = '';

    // generate a random digit between 0 and 9 for each round, and store it as a string
    for (let i = 0; i < roundRef.current; i++) {
      number += Math.floor(Math.random() * 10);
    }
    currentNumberRef.current = number;
    setNumberVisible(true);
    setTimeout(() => {
      setNumberVisible(false);
    }, timerDuration);
  };

  const gameOver = () => {
    setIsActive(false);
  };

  const checkNumber = (e) => {
    e.preventDefault();

    if (userInput === currentNumberRef.current) {
      newRound();
      setUserInput('');
    } else {
      gameOver();
    }
  };

  return (
    <div className="flex w-full h-[80dvh] bg-sky-800 justify-center items-center flex-col gap-4">
      {isActive && numberVisible ? (
        <NumberDisplay currentNumberRef={currentNumberRef} timerDuration={timerDuration} />
      ) : isActive && !numberVisible ? (
        <NumberInput onSubmit={checkNumber} userInput={userInput} setUserInput={setUserInput} />
      ) : roundRef.current > 0 ? (
        <TestFinished result={score} tryAgain={startTest} addResult={addResult}>
          <h1 className="text-3xl">You remembered {score} digits</h1>
        </TestFinished>
      ) : (
        <StartScreen onStart={startTest} />
      )}
    </div>
  );
};

export default NumberMemory;
