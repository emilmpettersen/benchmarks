import { useRef, useState } from 'react';
import Button from '../../../ui/Button';
import { useNavigate } from 'react-router';
import { useLocalStorageArray } from '../../../utility/useLocalStorageArray';
import TestFinished from '../../../components/TestFinished';

const ClickBox = () => {
  const [testActive, setTestActive] = useState(false);
  const [isGreen, setIsGreen] = useState(false);
  const [reactionTime, setReactionTime] = useState(null);
  const [redClick, setRedClick] = useState(false);
  const [average, setAverage] = useState();
  const [sessionComplete, setSessionComplete] = useState(false);
  const startTime = useRef(null);
  const timeoutId = useRef(null);
  const results = useRef([]);
  const [reactionHistory, addResult, clearHistory] = useLocalStorageArray('reactionTime');

  const getBoxClass = () => {
    if (!testActive) return 'bg-blue-500';
    if (isGreen) return 'bg-green-500';
    return 'bg-red-600';
  };

  const restart = () => {
    setSessionComplete(false);
    setAverage();
    setReactionTime(null);
    setAverage(null);
    results.current = [];
  };

  let heading, subtext, actionArea;

  if (sessionComplete) {
    heading = `${average}ms`;
    subtext = 'Save your score or try again!';
  } else if (redClick) {
    heading = 'Too fast!';
    subtext = 'Wait for green. Click to try again.';
  } else if (reactionTime) {
    heading = `${reactionTime}ms`;
    subtext = 'Click to try again';
  } else {
    heading = 'Reaction time test';
    subtext = 'Click as fast as possible when this box turns green. Click anywhere to start';
  }

  let boxContent;
  if (sessionComplete) {
    boxContent = (
      <TestFinished addResult={addResult} result={average} tryAgain={restart}>
        <h3 className="text-5xl mb-8">{heading}</h3>
        <p className="text-2xl">{subtext}</p>
      </TestFinished>
    );
  } else if (!testActive) {
    boxContent = (
      <div className="text-center">
        <h3 className="text-5xl mb-8">{heading}</h3>
        <p className="text-2xl">{subtext}</p>
        {actionArea && actionArea}
      </div>
    );
  } else {
    boxContent = <h3>{isGreen ? 'CLICK NOW' : 'Wait for green...'}</h3>;
  }
  // else {
  //   boxContent = <h3>Wait for green...</h3>;
  // }

  const handleBoxClick = () => {
    if (!testActive || redClick) {
      setRedClick(false);
      setTestActive(!testActive);
      const delay = Math.random() * 5000 + 1000;
      timeoutId.current = setTimeout(() => {
        setIsGreen(true);
        startTime.current = Date.now();
      }, delay);
    }
    if (testActive && isGreen) {
      const rt = Date.now() - startTime.current;
      setReactionTime(rt);
      setTestActive(!testActive);
      setIsGreen(false);
      results.current.push(rt);
      if (results.current.length >= 5) {
        handleSessionComplete();
      }
    }
    if (testActive && !isGreen) {
      setTestActive(!testActive);
      clearTimeout(timeoutId.current);
      setRedClick(true);
    }
  };

  const handleSessionComplete = () => {
    const total = results.current.reduce((sum, result) => sum + result, 0);
    const avg = Math.floor(total / results.current.length);
    setAverage(avg);
    setSessionComplete(true);
  };

  return (
    <div
      onClick={sessionComplete ? undefined : handleBoxClick}
      className={`h-[70dvh] ${getBoxClass()} flex justify-center items-center`}
    >
      {boxContent}
    </div>
  );
};

export default ClickBox;
