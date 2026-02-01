import React from 'react';

const NumberInput = ({ onSubmit, userInput, setUserInput }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onPaste={(e) => e.preventDefault()}
        autoFocus
        className="p-4 border-sky-800 border-2 bg-sky-600 rounded-lg text-3xl"
      />
    </form>
  );
};

export default NumberInput;
