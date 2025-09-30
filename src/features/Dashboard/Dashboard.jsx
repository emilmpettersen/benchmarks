import React from 'react';
import { useLocalStorageArray } from '../../utility/useLocalStorageArray';

const Dashboard = (props) => {
  const [reactionTime, addReactionTime, clearReactionHistory] =
    useLocalStorageArray('reactionTime');
  const [mouseAim, addMouseAim, clearMouseAimHistory] = useLocalStorageArray('mouseAim');
  return (
    <div>
      <div>Reaction time: {reactionTime}</div>
      <div>Mouse aim: {mouseAim}</div>
    </div>
  );
};

export default Dashboard;
