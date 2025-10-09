import React, { useEffect, useRef, useState } from 'react';
import words from '../../assets/data/words.json';
import Button from '../../ui/Button';
const VerbalMemory = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const seenWords = useRef(new Set());
  const activeWordsRef = useRef([]);
  const wordList = words.words;
  const newWordsCount = 20;
  console.log(wordList);

  const addActiveWords = () => {
    for (let i = 0; i < newWordsCount; i++) {
      activeWordsRef.current.push(getRandomWord());
    }
    console.log(activeWordsRef.current);
  };

  const getRandomWord = () => {
    return wordList[Math.floor(Math.random() * wordList.length)];
  };

  const startTest = () => {
    setCurrentWord(getRandomActiveWord());
  };

  const getRandomActiveWord = () => {
    return activeWordsRef.current[Math.floor(Math.random() * activeWordsRef.current.length)];
  };

  useEffect(() => {
    addActiveWords();
  }, []);

  const handleNew = () => {
    if (isNew()) {
      seenWords.current.add(currentWord);
      setScore((prev) => prev + 1);
      setCurrentWord(getRandomActiveWord());
    } else {
      alert('incorrect');
    }
  };

  const handleDuplicate = () => {
    if (!isNew()) {
      setScore((prev) => prev + 1);
      setCurrentWord(getRandomActiveWord());
    } else {
      alert('incorrect');
    }
  };

  const isNew = () => {
    return !seenWords.current.has(currentWord);
  };

  return (
    <div>
      <Button handleClick={startTest}>Start test</Button>
      <div>
        {currentWord} - {score}
      </div>

      <Button handleClick={handleNew}>New</Button>
      <Button handleClick={handleDuplicate}>Duplicate</Button>
    </div>
  );
};

export default VerbalMemory;
