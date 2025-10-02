import React, { useRef, useState } from 'react';
import Target from './Target';
import Button from '../../ui/Button';
import { useLocalStorageArray } from '../../utility/useLocalStorageArray';
import { useNavigate } from 'react-router';

const getRandomPosition = () => {
  const horizontalMax = 800;
  const verticalMax = 450;

  const x = Math.round(Math.random() * horizontalMax);
  const y = Math.round(Math.random() * verticalMax);
  return { x, y };
};

const AimArea = () => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({});
  const [targetCount, setTargetCount] = useState(1);
  const [reactionTime, setReactionTime] = useState(null);
  const startTime = useRef(null);
  const totalTargets = 30;
  const [aimHistory, addResult, clearHistory] = useLocalStorageArray('mouseAim');
  const navigate = useNavigate();

  const handleTargetClick = () => {
    setPosition(getRandomPosition());

    setTargetCount((prev) => prev + 1);
    console.log(targetCount);
    if (targetCount >= totalTargets) {
      const rt = Math.floor((Date.now() - startTime.current) / totalTargets);
      setReactionTime(rt);
      setIsActive(false);
    }
  };

  const saveScore = () => {
    addResult(reactionTime);
    navigate('/dashboard');
  };

  const startBenchmark = () => {
    if (reactionTime != null) {
      setReactionTime(null);
      setTargetCount(1);
    }
    setIsActive(true);
    setPosition(getRandomPosition());
    startTime.current = Date.now();
  };

  return (
    <div
      className={`flex justify-center w-full h-[80dvh] bg-slate-400 flex-col text-center ${!isActive ? 'items-center' : ''} `}
    >
      {isActive ? (
        <>
          <span>
            {targetCount} of {totalTargets}
          </span>
          <div className="m-auto w-[850px] h-[550px] relative">
            <Target position={position} handleTargetClick={handleTargetClick}></Target>
          </div>
        </>
      ) : reactionTime != null ? (
        <div className="flex gap-8 flex-col">
          <h3 className="text-3xl">{reactionTime}ms</h3>
          <div className="flex gap-4 justify-center">
            <Button handleClick={saveScore}>Save score</Button>
            <Button handleClick={startBenchmark}>Try again</Button>
          </div>
        </div>
      ) : (
        <Button handleClick={startBenchmark}>Start benchmark</Button>
      )}
    </div>
  );
};

export default AimArea;
