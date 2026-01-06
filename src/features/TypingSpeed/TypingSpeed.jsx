import React, { useState, useCallback, useEffect, useRef } from 'react';
import books from '../../assets/data/bookExcerpts.json';
import StartScreen from '../../components/StartScreen';
import TestFinished from '../../components/TestFinished';
import { useLocalStorageArray } from '../../utility/useLocalStorageArray';

const TypingSpeed = () => {
  const [excerpt, setExcerpt] = useState(books[Math.floor(Math.random() * books.length)].excerpt);
  const splitExcerpt = excerpt.split('');
  const [spelled, setSpelled] = useState([]);
  const [testActive, setTestActive] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [correctCharactersCount, setCorrectCharactersCount] = useState(0);
  const incorrectCharactersCount = spelled.length - correctCharactersCount;
  const rawWPMRef = useRef();
  const [result, setResult] = useState(0);
  const startTimeRef = useRef(null);
  const [typingSpeedHistory, addResult, clearHistory] = useLocalStorageArray('typingSpeed');

  const handleKeyDown = useCallback((event) => {
    const pressedKey = event.key;
    setSpelled((prev) => {
      if (pressedKey === 'Backspace' && prev.length > 0) {
        return prev.slice(0, -1);
      }
      if (!/^[a-zA-Z-'"" ",.;]$/.test(pressedKey)) return prev;
      if (pressedKey === "'") {
        event.preventDefault();
      }
      return [...prev, pressedKey];
    });
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let correct = 0;
    for (let i = 0; i < spelled.length; i++) {
      if (spelled[i] === splitExcerpt[i]) correct++;
      if (spelled.length === splitExcerpt.length) handleTestComplete();
    }
    setCorrectCharactersCount(correct);
  }, [spelled, excerpt]);

  const handleTestComplete = () => {
    setTestComplete(true);
    const finishTime = Date.now();
    const accuracy = correctCharactersCount / spelled.length;
    rawWPMRef.current = calculateWPM(spelled.length, startTimeRef.current, finishTime);
    setResult(Math.round(rawWPMRef.current * accuracy));
    console.log(result);
  };

  const calculateWPM = (characters, startTime, finishTime) => {
    const minutes = (finishTime - startTime) / 60000;
    console.log(characters + ' ' + startTime + ' ' + finishTime);
    return Math.round(characters / 5 / minutes);
  };

  const getRandomExcerpt = () => {
    setExcerpt(books[Math.floor(Math.random() * books.length)].excerpt);
  };

  const startTest = () => {
    getRandomExcerpt();
    setTestActive(true);
    setSpelled([]);
    startTimeRef.current = Date.now();
    console.log(startTimeRef.current);
  };

  return (
    <div className="flex w-full h-[80dvh] bg-sky-800 justify-center items-center flex-col gap-4">
      {!testActive ? (
        <StartScreen
          onStart={startTest}
          heading="Typing speed"
          subtext="Type the excerpt as fast and accurately as you can."
        >
          <h1 className="text-3xl">Typing speed</h1>
          <p>Type the excerpt as fast and accurately as you can.</p>
        </StartScreen>
      ) : testComplete ? (
        <TestFinished result={result} tryAgain={startTest} addResult={addResult}>
          <h1 className="text-3xl">You typed {result} words per minute</h1>
          <p></p>
        </TestFinished>
      ) : (
        <div className="max-w-[1024px]">
          {splitExcerpt.map((letter, index) => (
            <span
              key={index}
              className={`${index === spelled.length ? 'underline ' : ''} ${
                splitExcerpt[index] === spelled[index] && index <= spelled.length
                  ? 'text-green-400 '
                  : spelled[index] != undefined
                    ? 'text-red-400 '
                    : 'opacity-50'
              }`}
            >
              {letter}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypingSpeed;
