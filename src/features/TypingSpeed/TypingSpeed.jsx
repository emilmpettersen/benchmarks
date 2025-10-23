import React, { useState, useCallback, useEffect } from 'react';
import books from '../../assets/data/bookExcerpts.json';

const TypingSpeed = () => {
  const [excerpt, setExcerpt] = useState(books[Math.floor(Math.random() * books.length)].excerpt);
  const comparableExcerpt = excerpt.replaceAll('\n', '');
  const [spelled, setSpelled] = useState('');

  const handleKeyDown = useCallback((event) => {
    const pressedKey = event.key;
    if (pressedKey === 'Backspace') {
      setSpelled((prev) => prev.slice(0, -1));
    }
    if (!/^[a-zA-Z-'"" ",.]$/.test(pressedKey)) return;
    if (pressedKey === "'") {
      event.preventDefault();
    }
    setSpelled((prev) => prev + pressedKey);
    /* setWordProgress((prevProgress) => {
      if (pressedKey === prevProgress[0]) {
        setSpelled((prev) => prev + pressedKey);
        return prevProgress.slice(1);
      } else {
        return prevProgress;
      }
    }); */
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    console.log(spelled[spelled.length - 1] === comparableExcerpt[spelled.length - 1]);
  }, [spelled]);

  const getRandomExcerpt = () => {
    setExcerpt(books[Math.floor(Math.random() * books.length)].excerpt);
  };

  return (
    <div className="max-w-[1024px] m-auto pointer-events-none select-none">
      {spelled}
      <p>
        {excerpt.split('\n').map((line, j) => (
          <React.Fragment key={j}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default TypingSpeed;
