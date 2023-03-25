import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import OptionsPanel from './components/OptionsPanel';

import { BoardNode, Pos, NodeType, Algorithm } from './types';

function App() {
  const [startPos, setStartPos] = useState<Pos>({ x: -1, y: -1 });
  const [endPos, setEndPos] = useState<Pos>({ x: -1, y: -1 });
  const [nodeSelectType, setNodeSelectNodeType] = useState<NodeType>(
    NodeType.Start
  );
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.Brute);
  const [grid, setGrid] = useState<BoardNode[][]>([]);
  const [holding, setHolding] = useState<Boolean>(false);

  const rows = 20;
  const cols = 38;

  const resetStartPos = (): void => {
    setStartPos({ x: -1, y: -1 });
  };

  const resetEndPos = (): void => {
    setEndPos({ x: -1, y: -1 });
  };

  const resetBoard = (): void => {
    const newBoard: BoardNode[][] = [];

    for (let y = 0; y < rows; y++) {
      newBoard.push([]);
      for (let x = 0; x < cols; x++) {
        const node: BoardNode = {
          type: NodeType.Default,
          x: x,
          y: y,
        };

        newBoard[y].push(node);
      }
    }

    setGrid(newBoard);
  };

  const handleMouseUp = (e: React.MouseEvent): void => {
    if (nodeSelectType === NodeType.Wall && holding) {
      setHolding(false);
    }
  };

  const resetAll = (): void => {
    resetStartPos();
    resetEndPos();
    resetBoard();
  };

  const start = (): void => {
    console.log(start);
  };

  useEffect(() => {
    resetBoard();
  }, []);

  return (
    <div
      onMouseUp={handleMouseUp}
      className="w-full h-screen flex flex-col bg-[#0B0B45]"
    >
      {/* Navbar */}
      <div className="w-full h-[50px] px-4 flex justify-center text-gray-300">
        <h1 className="p-2 select-none text-3xl bold">Algo Visualizer</h1>
      </div>

      {/* Main Panel */}
      <div className="mx-1 grid grid-cols-5">
        {/* Board */}

        <Board
          nodeSelectType={nodeSelectType}
          algorithm={algorithm}
          grid={grid}
          setGrid={setGrid}
          startPos={startPos}
          setStartPos={setStartPos}
          endPos={endPos}
          setEndPos={setEndPos}
          holding={holding}
          setHolding={setHolding}
        />

        {/* Options Panel */}
        <OptionsPanel
          nodeSelectType={nodeSelectType}
          setNodeSelectType={setNodeSelectNodeType}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          start={start}
          resetAll={resetAll}
        />
      </div>
    </div>
  );
}

export default App;
