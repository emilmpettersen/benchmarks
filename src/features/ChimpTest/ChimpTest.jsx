import React, { useEffect, useState } from 'react';

const ChimpTest = () => {
  // 5x8 board
  const boardX = 8;
  const boardY = 5;
  const totalCells = boardX * boardY;

  const [digitsCount, setDigitsCount] = useState(5);
  const [numberedCells, setNumberedCells] = useState({});
  const [numbersVisible, setNumbersVisible] = useState(true);

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

  useEffect(() => {
    generateRandomCells();
  }, [digitsCount]);

  return (
    <div className="max-w-[1024px] m-auto">
      <div className="grid grid-cols-8 gap-1">
        {Array.from({ length: totalCells }, (_, i) => (
          <div
            key={i}
            className="w-20 h-20 border-2 border-gray-200 flex items-center justify-center rounded text-xl font-bold"
          >
            {numberedCells[i] && numbersVisible ? numberedCells[i] : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChimpTest;
