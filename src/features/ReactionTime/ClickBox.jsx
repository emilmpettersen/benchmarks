import { useRef, useState } from 'react';

const ClickBox = (props) => {
  const [testActive, setTestActive] = useState(false);
  const [isGreen, setIsGreen] = useState(false);
  const [reactionTime, setReactionTime] = useState(null);
  const startTime = useRef(null);
  const timeoutId = useRef(null);
  const results = useRef([]);

  const getBoxClass = () => {
    if (!testActive) return 'bg-blue-500';
    if (isGreen) return 'bg-green-500';
    return 'bg-red-600';
  };

  let boxContent;
  if (!testActive) {
    boxContent = (
      <div className="text-center">
        <h3 className="text-5xl mb-8">
          {reactionTime ? `You reacted in ${reactionTime}ms` : 'Reaction time test'}
        </h3>
        <p className="text-xl">
          {reactionTime
            ? 'Click to try again'
            : 'Click as fast as possible when this box turns green. Click anywhere to start'}
        </p>
      </div>
    );
  } else if (isGreen) {
    boxContent = <h3>CLICK NOW</h3>;
  } else {
    boxContent = <h3>Wait for green...</h3>;
  }

  const handleBoxClick = () => {
    if (!testActive) {
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
      console.log(results.current);
    }
  };

  return (
    <div
      onClick={handleBoxClick}
      className={`h-[70dvh] ${getBoxClass()} flex justify-center items-center`}
    >
      {boxContent}
    </div>
  );
};

export default ClickBox;
