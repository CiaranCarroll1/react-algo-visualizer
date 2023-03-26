import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import OptionsPanel from './components/OptionsPanel';

import { BoardNode, NodeType, Algorithm, Result } from './types';
import { astar } from './algorithms/astar';

function App() {
  const cols = 38;
  const rows = 20;

  const [startNode, setStartNode] = useState<BoardNode>({
    type: NodeType.Start,
    x: 0,
    y: 0,
    g: 0,
    f: 0,
    h: 0,
    previous: null,
  });
  const [endNode, setEndNode] = useState<BoardNode>({
    type: NodeType.End,
    x: cols - 1,
    y: rows - 1,
    g: 0,
    f: 0,
    h: 0,
    previous: null,
  });
  const [nodeSelectType, setNodeSelectNodeType] = useState<NodeType>(
    NodeType.Start
  );
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.Brute);
  const [grid, setGrid] = useState<BoardNode[][]>([]);
  const [holding, setHolding] = useState<Boolean>(false);

  const resetStartNode = (): void => {
    setStartNode({
      type: NodeType.Default,
      x: 0,
      y: 0,
      g: 0,
      f: 0,
      h: 0,
      previous: null,
    });
  };

  const resetEndNode = (): void => {
    setEndNode({
      type: NodeType.Default,
      x: 37,
      y: 19,
      g: 0,
      f: 0,
      h: 0,
      previous: null,
    });
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
          g: 0,
          f: 0,
          h: 0,
          previous: null,
        };

        if (x === 0 && y === 0) {
          node.type = NodeType.Start;
          setStartNode(node);
        }
        if (x === cols - 1 && y === rows - 1) {
          node.type = NodeType.End;
          setEndNode(node);
        }

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
    resetStartNode();
    resetEndNode();
    resetBoard();
  };

  const animateVisited = async (nodes: BoardNode[]) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.type !== NodeType.Start && node.type !== NodeType.End) {
        setTimeout(() => {
          let newGrid = [...grid];
          newGrid[node.y][node.x].type = NodeType.Visited;
          setGrid(newGrid);
        }, 25 * i);
      }
    }
  };

  const animatePath = (nodes: BoardNode[], visitedLength: number) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.type !== NodeType.Start && node.type !== NodeType.End) {
        setTimeout(() => {
          let newGrid = [...grid];
          newGrid[node.y][node.x].type = NodeType.Path;
          setGrid(newGrid);
        }, 25 * (visitedLength + i));
      }
    }
  };

  const animate = (result: Result) => {
    const visited = result.visited;
    const path = result.path;

    animateVisited(visited);
    animatePath(path, visited.length);
  };

  const handleStartClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    const result = astar(grid, startNode, endNode);
    if (result === null) {
      alert('No path');
    } else {
      animate(result);
    }
  };

  // useEffect(() => {
  //   if (result === null) return;

  //   const tempIntervalId = setInterval(() => {
  //     if (result.closedList.length > 0) {
  //       const tempGrid = [...grid];
  //       const tempResult = { ...result };
  //       const nodeToUpdate = tempResult.closedList.pop();
  //       if (
  //         nodeToUpdate &&
  //         nodeToUpdate.type !== NodeType.Start &&
  //         nodeToUpdate.type !== NodeType.End
  //       ) {
  //         tempGrid[nodeToUpdate.y][nodeToUpdate.x].type = NodeType.Visited;
  //         setResult(tempResult);
  //         setGrid(tempGrid);
  //       }
  //     } else if (result.path.length > 0) {
  //       const tempGrid = [...grid];
  //       const tempResult = { ...result };
  //       const nodeToUpdate = tempResult.path.pop();
  //       if (
  //         nodeToUpdate &&
  //         nodeToUpdate.type !== NodeType.Start &&
  //         nodeToUpdate.type !== NodeType.End
  //       ) {
  //         tempGrid[nodeToUpdate.y][nodeToUpdate.x].type = NodeType.Path;
  //         setResult(tempResult);
  //         setGrid(tempGrid);
  //       }
  //     } else {
  //       clearInterval(intervalId);
  //     }
  //   }, 200);

  //   setIntervalId(tempIntervalId);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [result]);

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
          startNode={startNode}
          setStartNode={setStartNode}
          endNode={endNode}
          setEndNode={setEndNode}
          holding={holding}
          setHolding={setHolding}
        />

        {/* Options Panel */}
        <OptionsPanel
          nodeSelectType={nodeSelectType}
          setNodeSelectType={setNodeSelectNodeType}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          resetAll={resetAll}
          handleStartClick={handleStartClick}
        />
      </div>
    </div>
  );
}

export default App;
