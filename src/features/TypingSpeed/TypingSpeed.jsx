import React, { useState, useCallback, useEffect } from 'react';
import books from '../../assets/data/bookExcerpts.json';

const TypingSpeed = () => {
  const [excerpt, setExcerpt] = useState(books[Math.floor(Math.random() * books.length)].excerpt);
  const splitExcerpt = excerpt.split('');
  const [spelled, setSpelled] = useState([]);
  const [correctCharactersCount, setCorrectCharactersCount] = useState(0);
  const incorrectCharactersCount = spelled.length - correctCharactersCount;

  const handleKeyDown = useCallback((event) => {
    const pressedKey = event.key;
    setSpelled((prev) => {
      if (pressedKey === 'Backspace' && prev.length > 0) {
        return prev.slice(0, -1);
      }
      if (!/^[a-zA-Z-'"" ",.]$/.test(pressedKey)) return prev;
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
    }
    setCorrectCharactersCount(correct);
  }, [spelled, excerpt]);

  const getRandomExcerpt = () => {
    setExcerpt(books[Math.floor(Math.random() * books.length)].excerpt);
  };

  return (
    <div className="max-w-[1024px] m-auto pointer-events-none select-none">
      <p>
        {/* {spelled.map((letter, index) => (
          <span
            className={spelled[index] === splitExcerpt[index] ? 'text-green-400' : 'text-red-400'}
          >
            {letter}
          </span>
        ))} */}
        {/* {excerpt.split('\n').map((line, j) => (
          <React.Fragment key={j}>
            {line}
            <br />
          </React.Fragment>
        ))} */}
        {splitExcerpt.map((letter, index) => (
          <span
            className={`${index === spelled.length ? 'underline ' : ''} ${
              splitExcerpt[index] === spelled[index] && index <= spelled.length
                ? 'text-green-400 '
                : spelled[index] != undefined
                  ? 'text-red-400 '
                  : ''
            }`}
          >
            {letter}
          </span>
        ))}
      </p>
      <br></br>
      <br></br>
      <br></br>
      Paragraph length: {splitExcerpt.length}
      <br></br>
      <br></br>
      <br></br>
      Spelled: {spelled.length}
      <br></br>
      <br></br>
      <br></br>
      Incorrect characters: {incorrectCharactersCount}
      <br></br>
      <br></br>
      <br></br>
      Correct characters: {correctCharactersCount}
      <br></br>
      <br></br>
      <br></br>
      Accuracy: {((correctCharactersCount / spelled.length) * 100).toFixed(2)}%
    </div>
  );
};

export default TypingSpeed;
