import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import OptionsPanel from './components/OptionsPanel';

import { NodeT, Coords } from './model';

function App() {
  const [startCoords, setStartCoords] = useState<Coords>({ x: -1, y: -1 });
  const [endCoords, setEndCoords] = useState<Coords>({ x: -1, y: -1 });
  const [nodeSelectType, setNodeSelectNodeType] = useState<string>('start');
  const [nodes, setNodes] = useState<NodeT[][]>([]);

  const rows = 20;
  const cols = 38;

  const resetStartCoords = (): void => {
    setStartCoords({ x: -1, y: -1 });
  };

  const resetEndCoords = (): void => {
    setEndCoords({ x: -1, y: -1 });
  };

  const resetBoard = (): void => {
    const newBoard: NodeT[][] = [];

    for (let y = 0; y < rows; y++) {
      newBoard.push([]);
      for (let x = 0; x < cols; x++) {
        const node: NodeT = {
          type: 'default',
          x: x,
          y: y,
          visited: false,
        };

        newBoard[y].push(node);
      }
    }

    setNodes(newBoard);
  };

  const resetAll = (): void => {
    resetStartCoords();
    resetEndCoords();
    resetBoard();
  };

  useEffect(() => {
    resetBoard();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-[#0B0B45]">
      {/* Navbar */}
      <div className="w-full h-[50px] px-4 flex justify-center text-gray-300">
        <h1 className="p-2 select-none text-3xl bold">Algo Visualizer</h1>
      </div>

      {/* Main Panel */}
      <div className="grid grid-cols-5">
        {/* Board */}

        <Board
          nodeSelectType={nodeSelectType}
          nodes={nodes}
          setNodes={setNodes}
          startCoords={startCoords}
          setStartCoords={setStartCoords}
          endCoords={endCoords}
          setEndCoords={setEndCoords}
        />

        {/* Options Panel */}
        <OptionsPanel
          nodeSelectType={nodeSelectType}
          setNodeSelectType={setNodeSelectNodeType}
        />
      </div>
    </div>
  );
}

export default App;
