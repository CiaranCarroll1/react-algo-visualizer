import React from 'react';
import { BoardNode, Coords, NodeType } from './../model';

type Props = {
  nodeSelectType: NodeType;
  node: BoardNode;
  nodes: BoardNode[][];
  setNodes: React.Dispatch<React.SetStateAction<BoardNode[][]>>;
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

    if (nodeSelectType === NodeType.Start) {
      if (startCoords.x !== -1) {
        newNodes[startCoords.y][startCoords.x].type = NodeType.Default;
      }
      setStartCoords({ x: node.x, y: node.y });
    }
    if (nodeSelectType === NodeType.End) {
      if (endCoords.x !== -1) {
        newNodes[endCoords.y][endCoords.x].type = NodeType.Default;
      }
      setEndCoords({ x: node.x, y: node.y });
    }

    newNodes[node.y][node.x].type = nodeSelectType;
    setNodes(newNodes);
  };

  const handleMouseDown = (e: React.MouseEvent): void => {
    e.preventDefault();

    updateType();

    if (nodeSelectType === NodeType.Wall) {
      setHolding(true);
    }
  };

  const handleMouseOver = (e: React.MouseEvent): void => {
    e.preventDefault();

    if (nodeSelectType === NodeType.Wall && holding) {
      updateType();
    }
  };

  const handleMouseUp = (e: React.MouseEvent): void => {
    if (nodeSelectType === NodeType.Wall && holding) {
      setHolding(false);
    }
  };

  let bgColor = 'bg-white';
  if (node.type === NodeType.Start) {
    bgColor = 'bg-green-500';
  } else if (node.type === NodeType.End) {
    bgColor = 'bg-red-500';
  } else if (node.type === NodeType.Wall) {
    bgColor = 'bg-gray-500';
  } else if (node.type === NodeType.Visited) {
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
