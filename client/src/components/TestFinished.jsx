import React from 'react';
import { useNavigate } from 'react-router';
import Button from '../ui/Button';
const TestFinished = ({ result, tryAgain, addResult, children }) => {
  const navigate = useNavigate();

  const saveScore = () => {
    addResult(result);
    navigate('/dashboard');
  };

  return (
    <div className="text-center">
      {children}
      <div className="flex gap-4 justify-center mt-8">
        <Button handleClick={saveScore}>Save score</Button>
        <Button handleClick={tryAgain}>Try again</Button>
      </div>
    </div>
  );
};

export default TestFinished;
