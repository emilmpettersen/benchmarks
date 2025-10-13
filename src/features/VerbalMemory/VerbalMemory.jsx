import React, { useEffect, useRef, useState } from 'react';
import words from '../../assets/data/words.json';
import Button from '../../ui/Button';
import { useLocalStorageArray } from '../../utility/useLocalStorageArray';
import StartScreen from '../../components/StartScreen';
import TestFinished from '../../components/TestFinished';
const VerbalMemory = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [score, setScore] = useState(0);
  const seenWords = useRef(new Set());
  const activeWordsRef = useRef([]);
  const wordList = words.words;
  const newWordsCount = 20;
  const [verbMemHistory, addResult, clearHistory] = useLocalStorageArray('verbalMemory');

  const addActiveWords = () => {
    for (let i = 0; i < newWordsCount; i++) {
      activeWordsRef.current.push(getRandomWord());
    }
  };

  const getRandomWord = () => {
    return wordList[Math.floor(Math.random() * wordList.length)];
  };

  const startTest = () => {
    setCurrentWord(getRandomActiveWord());
    setScore(0);
    seenWords.current.clear();
    activeWordsRef.current = [];
    addActiveWords();
    setSessionComplete(false);
    setIsActive(true);
  };

  const getRandomActiveWord = () => {
    if (activeWordsRef.current.length <= 1) return currentWord;
    const newActiveWord =
      activeWordsRef.current[Math.floor(Math.random() * activeWordsRef.current.length)];

    if (newActiveWord === currentWord) {
      return getRandomActiveWord();
    } else {
      return newActiveWord;
    }
  };

  const gameOver = () => {
    setSessionComplete(true);
  };

  useEffect(() => {
    if (score === 0 || score % 10 === 0) addActiveWords();
  }, [score]);

  const handleNew = () => {
    if (isWordNew()) {
      seenWords.current.add(currentWord);
      setScore((prev) => prev + 1);
      setCurrentWord(getRandomActiveWord());
    } else {
      gameOver();
    }
  };

  const handleDuplicate = () => {
    if (!isWordNew()) {
      setScore((prev) => prev + 1);
      setCurrentWord(getRandomActiveWord());
    } else {
      gameOver();
    }
  };

  const isWordNew = () => {
    return !seenWords.current.has(currentWord);
  };

  return (
    <div className="flex w-full h-[80dvh] bg-sky-800 justify-center items-center flex-col gap-4">
      {sessionComplete ? (
        <TestFinished result={score} tryAgain={startTest} addResult={addResult}>
          <h1 className="text-3xl">You remembered correctly {score} times</h1>
        </TestFinished>
      ) : !isActive ? (
        <StartScreen onStart={startTest}>
          <h1 className="text-3xl ">How many words can you remember?</h1>
          <p>Decide whether each word is new or one you've seen before.</p>
        </StartScreen>
      ) : (
        <>
          <div>
            <h1 className="text-3xl">{currentWord}</h1>
          </div>
          <div className="flex gap-4">
            <Button handleClick={handleNew}>New</Button>
            <Button handleClick={handleDuplicate}>Seen</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default VerbalMemory;
