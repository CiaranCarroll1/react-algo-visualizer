import React from 'react';
import { BoardNode, NodeType } from '../types';

type Props = {
  nodeSelectType: NodeType;
  node: BoardNode;
  grid: BoardNode[][];
  setGrid: React.Dispatch<React.SetStateAction<BoardNode[][]>>;
  startNode: BoardNode;
  setStartNode: React.Dispatch<React.SetStateAction<BoardNode>>;
  endNode: BoardNode;
  setEndNode: React.Dispatch<React.SetStateAction<BoardNode>>;
  holding: Boolean;
  setHolding: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Node: React.FC<Props> = ({
  nodeSelectType,
  node,
  grid,
  setGrid,
  startNode,
  setStartNode,
  endNode,
  setEndNode,
  holding,
  setHolding,
}: Props) => {
  const updateType = (): void => {
    const newNodes = [...grid];

    if (nodeSelectType === NodeType.Start) {
      if (startNode.x !== -1) {
        newNodes[startNode.y][startNode.x].type = NodeType.Default;
      }
      setStartNode(node);
    }
    if (nodeSelectType === NodeType.End) {
      if (endNode.x !== -1) {
        newNodes[endNode.y][endNode.x].type = NodeType.Default;
      }
      setEndNode(node);
    }

    newNodes[node.y][node.x].type = nodeSelectType;
    setGrid(newNodes);
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

  let bgColor = 'bg-white';
  if (node.type === NodeType.Start) {
    bgColor = 'bg-green-500';
  } else if (node.type === NodeType.End) {
    bgColor = 'bg-red-500';
  } else if (node.type === NodeType.Wall) {
    bgColor = 'bg-gray-500';
  } else if (node.type === NodeType.Visited) {
    bgColor = 'bg-blue-500';
  } else if (node.type === NodeType.Path) {
    bgColor = 'bg-yellow-500';
  }

  return (
    <div className="p-[2px]">
      <div
        onMouseDown={handleMouseDown}
        onMouseOver={handleMouseOver}
        className={`w-7 h-7 ${bgColor} cursor-pointer text-center`}
      ></div>
    </div>
  );
};

export default Node;
