import React, { useEffect, useRef, useState } from 'react';
import TestFinished from '../../components/TestFinished';
import StartScreen from '../../components/StartScreen';
import { useLocalStorageArray } from '../../utility/useLocalStorageArray';

const ChimpTest = () => {
  // 5x8 board
  const boardX = 8;
  const boardY = 5;
  const totalCells = boardX * boardY;

  const [digitsCount, setDigitsCount] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const lives = useRef(3);
  const [numberedCells, setNumberedCells] = useState({});

  const [chimpTestHistory, addResult, clearHistory] = useLocalStorageArray('chimpTest');

  const [showRedFlash, setShowRedFlash] = useState(false);

  const [currentTargetNumber, setCurrentTargetNumber] = useState(1);
  const numbersVisible = currentTargetNumber == 1;

  const generateRandomCells = () => {
    const allIndexes = Array.from({ length: totalCells }, (_, i) => i);
    const shuffled = allIndexes.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, digitsCount);

    const cells = {};
    selected.forEach((cellIndex, i) => {
      cells[cellIndex] = i + 1;
    });

    setNumberedCells(cells);
  };

  const startTest = () => {
    setIsActive(true);
    lives.current = 3;
    setCurrentTargetNumber(1);
    setDigitsCount(5);
    generateRandomCells();
    setGameOver(false);
  };

  const handleNumberedCellClick = (number, index) => {
    if (number === currentTargetNumber) {
      if (number === digitsCount) {
        finishedRound();
      } else {
        setCurrentTargetNumber((prev) => prev + 1);
        delete numberedCells[index];
      }
    } else {
      setShowRedFlash(true); // <-- Trigger the flash

      setTimeout(() => {
        setShowRedFlash(false); // <-- Hide it after a short delay
      }, 200); // Flash duration

      if (lives.current > 1) {
        lives.current--;
      } else {
        setGameOver(true);
      }
    }
  };

  const finishedRound = () => {
    setDigitsCount((prev) => prev + 1);
    setCurrentTargetNumber(1);
  };

  useEffect(() => {
    generateRandomCells();
  }, [digitsCount]);

  return (
    <div className="bg-sky-800 relative">
      <div className="max-w-[1024px] m-auto flex justify-center items-center min-h-[80dvh] flex-col">
        <div
          className={`absolute inset-0 bg-red-600 ${showRedFlash ? 'opacity-70' : 'opacity-0'} z-50 pointer-events-none transition-opacity duration-200`}
        />
        {!isActive ? (
          <StartScreen onStart={startTest}>
            <div className="text-center flex flex-col gap-4 mb-4">
              <h1 className="text-3xl">Remember the order of the cells</h1>
              <p>Each round will add a new cell</p>
            </div>
          </StartScreen>
        ) : !gameOver ? (
          <div className={`grid grid-cols-${boardX} gap-1`}>
            {Array.from({ length: totalCells }, (_, i) => (
              <div
                onClick={
                  numberedCells[i] ? () => handleNumberedCellClick(numberedCells[i], i) : null
                }
                key={i}
                className={`w-20 h-20 ${numberedCells[i] && 'border-2'} border-gray-200 flex items-center justify-center rounded text-xl font-bold ${!numbersVisible && numberedCells[i] ? 'bg-gray-200' : ''}`}
              >
                {numberedCells[i] && numbersVisible ? numberedCells[i] : ''}
              </div>
            ))}
          </div>
        ) : (
          <TestFinished result={digitsCount} tryAgain={startTest} addResult={addResult}>
            <h1>You scored {digitsCount}</h1>
          </TestFinished>
        )}
      </div>
    </div>
  );
};

export default ChimpTest;
