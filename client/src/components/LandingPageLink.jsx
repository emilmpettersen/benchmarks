import React from 'react';
import { Link } from 'react-router';

const LandingPageLink = ({ to, text, Icon }) => {
  return (
    <Link
      className="p-10 bg-slate-900 rounded-lg justify-center items-center gap-4 text-slate-200 flex flex-col transition-all duration-200 ease-out hover:scale-105 group hover:shadow-[0px_0_20px_rgba(20,184,166,0.5)]"
      to={to}
    >
      <Icon className="text-3xl text-teal-500 transition-all duration-200 group-hover:text-teal-300 group-hover:drop-shadow-lg group-hover:drop-shadow-teal-500/50" />

      <h3 className="text-2xl">{text}</h3>
    </Link>
  );
};

export default LandingPageLink;
