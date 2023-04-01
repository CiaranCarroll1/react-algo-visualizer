import React from 'react';
import { Link, useMatch } from 'react-router-dom';

const Navbar: React.FC = () => {
  const pathfindingActive = useMatch('/pathfinding');
  const searchingActive = useMatch('/searching');

  return (
    <div className="w-full px-2 h-[50px] flex justify-between items-center text-gray-300">
      <h1 className="select-none text-yellow-500 text-3xl bold">
        Algo Visualizer
      </h1>
      <div className="flex mr-3">
        <Link
          className="px-3 text-xl hover:text-yellow-500 cursor-pointer border-x border-gray-300"
          to="/pathfinding"
        >
          <span
            className={pathfindingActive ? 'underline text-yellow-500' : ''}
          >
            Pathfinding
          </span>
        </Link>
        <Link
          className="px-3 text-xl hover:text-yellow-500 cursor-pointer border-x border-gray-300"
          to="/searching"
        >
          <span className={searchingActive ? 'underline text-yellow-500' : ''}>
            Searching
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
