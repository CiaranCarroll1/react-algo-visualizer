import React, { useState, useEffect } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import Grid from './components/Grid';
import OptionsBar from './components/OptionsBar';
import { GridNode, NodeType, Algorithm, Result } from './types';
import { dijkstra } from './algorithms/dijkstra';

function App() {
  const [startNode, setStartNode] = useState<GridNode>();
  const [endNode, setEndNode] = useState<GridNode>();
  const [nodeSelectType, setNodeSelectNodeType] = useState<NodeType>(
    NodeType.Start
  );
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.Dijkstra);
  const [grid, setGrid] = useState<GridNode[][]>([]);
  const [holding, setHolding] = useState<Boolean>(false);

  const cols = 54;
  const rows = 21;
  const initialStartPos = { x: Math.floor(cols / 4), y: Math.floor(rows / 2) };
  const initialEndPos = {
    x: cols - Math.floor(cols / 4),
    y: Math.floor(rows / 2),
  };

  const initializeGrid = (): GridNode[][] => {
    const newGrid: GridNode[][] = [];

    for (let y = 0; y < rows; y++) {
      newGrid.push([]);
      for (let x = 0; x < cols; x++) {
        const node: GridNode = {
          type: NodeType.Default,
          x: x,
          y: y,
          g: algorithm === Algorithm.Dijkstra ? Infinity : 0,
          f: 0,
          h: 0,
          previous: null,
        };

        newGrid[y].push(node);
      }
    }

    return newGrid;
  };

  const handleMouseUp = (e: React.MouseEvent): void => {
    if (nodeSelectType === NodeType.Wall && holding) {
      setHolding(false);
    }
  };

  const reset = (): void => {
    const newGrid = initializeGrid();

    if (startNode && endNode) {
      const newStart = newGrid[startNode.y][startNode.x];
      newStart.type = NodeType.Start;
      newStart.g = algorithm === Algorithm.Dijkstra ? Infinity : 0;
      setStartNode(newStart);

      const newEnd = newGrid[endNode.y][endNode.x];
      newEnd.type = NodeType.End;
      newEnd.g = algorithm === Algorithm.Dijkstra ? Infinity : 0;
      setEndNode(newEnd);
    } else {
      const start = newGrid[initialStartPos.y][initialStartPos.x];
      start.type = NodeType.Start;
      setStartNode(start);

      const end = newGrid[initialEndPos.y][initialEndPos.x];
      end.type = NodeType.End;
      setEndNode(end);
    }

    setGrid(newGrid);
  };

  const handleResetClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    reset();
  };

  const animateVisited = async (nodes: GridNode[]) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.type !== NodeType.Start && node.type !== NodeType.End) {
        setTimeout(() => {
          let newGrid = [...grid];
          newGrid[node.y][node.x].type = NodeType.Visited;
          setGrid(newGrid);
        }, 20 * i);
      }
    }
  };

  const animatePath = (nodes: GridNode[], visitedLength: number) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.type !== NodeType.Start && node.type !== NodeType.End) {
        setTimeout(() => {
          let newGrid = [...grid];
          newGrid[node.y][node.x].type = NodeType.Path;
          setGrid(newGrid);
        }, 20 * (visitedLength + i));
      }
    }
  };

  const animate = (result: Result) => {
    const visited = result.visited;
    const path = result.path;

    animateVisited(visited);
    animatePath(path, visited.length);
  };

  const play = (): void => {
    const result = dijkstra(
      grid,
      startNode as GridNode,
      endNode as GridNode,
      algorithm === Algorithm.Astar
    );
    if (result === null) {
      alert('Not possible');
    } else {
      animate(result);
    }
  };

  const handlePlayClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    play();
  };

  useEffect(() => {
    reset();
  }, [algorithm]);

  return (
    <div
      onMouseUp={handleMouseUp}
      className="w-full h-screen flex flex-col bg-[#0B0B45]"
    >
      {/* Toolbar */}
      <Toolbar
        handlePlayClick={handlePlayClick}
        handleResetClick={handleResetClick}
      />

      {/* Options Panel */}
      <OptionsBar
        nodeSelectType={nodeSelectType}
        setNodeSelectType={setNodeSelectNodeType}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />

      {/* Grid */}
      <Grid
        nodeSelectType={nodeSelectType}
        algorithm={algorithm}
        grid={grid}
        setGrid={setGrid}
        startNode={startNode as GridNode}
        setStartNode={setStartNode}
        endNode={endNode as GridNode}
        setEndNode={setEndNode}
        holding={holding}
        setHolding={setHolding}
      />
    </div>
  );
}

export default App;
