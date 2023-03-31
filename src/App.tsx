import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Pathfinding from './components/Pathfinding';
import Searching from './components/Searching';

const App: React.FC = () => {
  return (
    <div className="w-[1536px] h-screen flex flex-col bg-[#0B0B45]">
      <BrowserRouter>
        {/* Header */}
        <div className="w-full px-2 h-[50px] flex justify-between items-center text-gray-300">
          <h1 className="select-none text-yellow-500 text-3xl bold">
            Algo Visualizer
          </h1>
          <div className="flex">
            <Link
              className="px-3 text-xl hover:text-yellow-500 cursor-pointer"
              to="/pathfinding"
            >
              Pathfinding
            </Link>
            <Link
              className="px-3 text-xl hover:text-yellow-500 cursor-pointer"
              to="/searching"
            >
              Searching
            </Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/pathfinding" />} />
          <Route path="/pathfinding" element={<Pathfinding />} />
          <Route path="/searching" element={<Searching />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
