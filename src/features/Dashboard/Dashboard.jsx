import React from 'react';

const dashboard = (props) => {
  return <div>Reaction time: {localStorage.getItem('reactionTime')}</div>;
};

export default dashboard;
