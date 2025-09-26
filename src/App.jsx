import { useState } from 'react';
import { Link } from 'react-router';

function App() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Link
        className="p-5 bg-teal-100 border-4 border-teal-200 rounded-lg text-center text-slate-700"
        to={'/reactiontime'}
      >
        <h3>Reaction Time</h3>
      </Link>
      <Link
        className="p-5 bg-teal-100 border-4 border-teal-200 rounded-lg text-center text-slate-700"
        to={'/chimptest'}
      >
        <h3>Chimp Test</h3>
      </Link>
      <Link
        className="p-5 bg-teal-100 border-4 border-teal-200 rounded-lg text-center text-slate-700"
        to={'/mouseaim'}
      >
        <h3>Mouse Aim</h3>
      </Link>
      <Link
        className="p-5 bg-teal-100 border-4 border-teal-200 rounded-lg text-center text-slate-700"
        to={'/numbermemory'}
      >
        <h3>Number Memory</h3>
      </Link>
      <Link
        className="p-5 bg-teal-100 border-4 border-teal-200 rounded-lg text-center text-slate-700"
        to={'/verbalmemory'}
      >
        <h3>Verbal Memory</h3>
      </Link>
      <Link
        className="p-5 bg-teal-100 border-4 border-teal-200 rounded-lg text-center text-slate-700"
        to={'/typingspeed'}
      >
        <h3>Typing Speed</h3>
      </Link>
    </div>
  );
}

export default App;
