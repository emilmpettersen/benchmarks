import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Life = ({ filled }) => {
  console.log(filled);
  return filled ? <FaHeart /> : <FaRegHeart />;
};

export default Life;
