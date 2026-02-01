import React, { useRef, useState } from 'react';
import Target from './Target';
import Button from '../../../ui/Button';
import { useLocalStorageArray } from '../../../utility/useLocalStorageArray';
import TestFinished from '../../../components/TestFinished';
import StartScreen from '../../../components/StartScreen';

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
  const { data: aimHistory, add: addResult } = useLocalStorageArray('mouseAim');

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
      className={`flex justify-center w-full h-[80dvh] bg-sky-800 flex-col text-center ${!isActive ? 'items-center gap-4' : ''} `}
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
        <TestFinished result={reactionTime} addResult={addResult} tryAgain={startBenchmark}>
          <h3 className="text-3xl">Your average reaction time was {reactionTime}ms</h3>
        </TestFinished>
      ) : (
        <StartScreen onStart={startBenchmark}>
          <h1 className="text-3xl ">How fast can you click the targets?</h1>
          <p>Click the targets as fast as you can.</p>
        </StartScreen>
      )}
    </div>
  );
};

export default AimArea;
