import React from 'react';
import { BoardNode, Pos, NodeType } from '../types';

type Props = {
  nodeSelectType: NodeType;
  node: BoardNode;
  grid: BoardNode[][];
  setGrid: React.Dispatch<React.SetStateAction<BoardNode[][]>>;
  startPos: Pos;
  setStartPos: React.Dispatch<React.SetStateAction<Pos>>;
  endPos: Pos;
  setEndPos: React.Dispatch<React.SetStateAction<Pos>>;
  holding: Boolean;
  setHolding: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Node: React.FC<Props> = ({
  nodeSelectType,
  node,
  grid,
  setGrid,
  startPos,
  setStartPos,
  endPos,
  setEndPos,
  holding,
  setHolding,
}: Props) => {
  const updateType = (): void => {
    const newNodes = [...grid];

    if (nodeSelectType === NodeType.Start) {
      if (startPos.x !== -1) {
        newNodes[startPos.y][startPos.x].type = NodeType.Default;
      }
      setStartPos({ x: node.x, y: node.y });
    }
    if (nodeSelectType === NodeType.End) {
      if (endPos.x !== -1) {
        newNodes[endPos.y][endPos.x].type = NodeType.Default;
      }
      setEndPos({ x: node.x, y: node.y });
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
        className={`w-7 h-7 ${bgColor} cursor-pointer`}
      ></div>
    </div>
  );
};

export default Node;
