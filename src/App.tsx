import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Pathfinding from './components/Pathfinding';
import Searching from './components/Searching';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className="w-[1536px] h-screen flex flex-col bg-[#0B0B45]">
      <BrowserRouter>
        <Navbar />

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
