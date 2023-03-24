import React from 'react';
import { NodeT, Coords } from './../model';

type Props = {
  nodeSelectType: string;
  node: NodeT;
  nodes: NodeT[][];
  setNodes: React.Dispatch<React.SetStateAction<NodeT[][]>>;
  startCoords: Coords;
  setStartCoords: React.Dispatch<React.SetStateAction<Coords>>;
  endCoords: Coords;
  setEndCoords: React.Dispatch<React.SetStateAction<Coords>>;
  holding: Boolean;
  setHolding: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Node: React.FC<Props> = ({
  nodeSelectType,
  node,
  nodes,
  setNodes,
  startCoords,
  setStartCoords,
  endCoords,
  setEndCoords,
  holding,
  setHolding,
}: Props) => {
  const updateType = (): void => {
    const newNodes = [...nodes];

    if (nodeSelectType === 'start') {
      if (startCoords.x !== -1) {
        newNodes[startCoords.y][startCoords.x].type = 'default';
      }
      setStartCoords({ x: node.x, y: node.y });
    }
    if (nodeSelectType === 'end') {
      if (endCoords.x !== -1) {
        newNodes[endCoords.y][endCoords.x].type = 'default';
      }
      setEndCoords({ x: node.x, y: node.y });
    }

    newNodes[node.y][node.x].type = nodeSelectType;
    setNodes(newNodes);
  };

  const handleMouseDown = (e: React.MouseEvent): void => {
    e.preventDefault();

    updateType();

    if (nodeSelectType === 'wall') {
      setHolding(true);
    }
  };

  const handleMouseOver = (e: React.MouseEvent): void => {
    e.preventDefault();

    if (nodeSelectType === 'wall' && holding) {
      updateType();
    }
  };

  const handleMouseUp = (e: React.MouseEvent): void => {
    if (nodeSelectType === 'wall' && holding) {
      setHolding(false);
    }
  };

  let bgColor = 'bg-white';
  if (node.type === 'start') {
    bgColor = 'bg-green-500';
  } else if (node.type === 'end') {
    bgColor = 'bg-red-500';
  } else if (node.type === 'wall') {
    bgColor = 'bg-gray-500';
  } else if (node.visited) {
    bgColor = 'bg-blue-500';
  }

  return (
    <div className="p-[2px]">
      <div
        onMouseDown={handleMouseDown}
        onMouseOver={handleMouseOver}
        onMouseUp={handleMouseUp}
        className={`w-7 h-7 ${bgColor} cursor-pointer`}
      ></div>
    </div>
  );
};

export default Node;
