import React from 'react';
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className="w-full bg-slate-900 border-b-4 border-slate-600 flex px-8">
      <Link to="/" className="hover:bg-slate-600 h-[60px] flex items-center px-6 transition-colors">
        Home
      </Link>
      <Link
        to="/dashboard"
        className="hover:bg-slate-600 h-[60px] flex items-center px-6 transition-colors"
      >
        Dashboard
      </Link>
      <Link
        to="/reactiontime"
        className="hover:bg-slate-600 h-[60px] flex items-center px-6 transition-colors"
      >
        Reaction time
      </Link>
      <Link
        to="/chimptest"
        className="hover:bg-slate-600 h-[60px] flex items-center px-6 transition-colors"
      >
        Chimp test
      </Link>
      <Link
        to="/mouseaim"
        className="hover:bg-slate-600 h-[60px] flex items-center px-6 transition-colors"
      >
        Mouse aim
      </Link>
      <Link
        to="/numbermemory"
        className="hover:bg-slate-600 h-[60px] flex items-center px-6 transition-colors"
      >
        Number memory
      </Link>
      <Link
        to="/verbalmemory"
        className="hover:bg-slate-600 h-[60px] flex items-center px-6 transition-colors"
      >
        Verbal memory
      </Link>
      <Link
        to="/typingspeed"
        className="hover:bg-slate-600 h-[60px] flex items-center px-6 transition-colors"
      >
        Typing speed
      </Link>
    </header>
  );
};

export default Header;
