import React from 'react';
import { useLocalStorageArray } from '../../utility/useLocalStorageArray';

const Dashboard = (props) => {
  const [reactionTime, addReactionTime, clearReactionHistory] =
    useLocalStorageArray('reactionTime');
  const [mouseAim, addMouseAim, clearMouseAimHistory] = useLocalStorageArray('mouseAim');
  const [numberMemory, addNumberMemory, clearNumberMemoryHistory] =
    useLocalStorageArray('numberMemory');

  return (
    <div>
      <div>Reaction time: {reactionTime.join(', ')}</div>
      <div>Mouse aim: {mouseAim.join(', ')}</div>
      <div>Number memory: {numberMemory.join(', ')}</div>
    </div>
  );
};

export default Dashboard;
