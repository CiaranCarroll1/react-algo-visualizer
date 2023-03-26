import React from 'react';
import { GridNode, NodeType } from '../types';
import { TbArrowBigRightLines, TbTarget, TbWeight } from 'react-icons/tb';
import { GiBrickWall } from 'react-icons/gi';

type Props = {
  nodeSelectType: NodeType;
  node: GridNode;
  grid: GridNode[][];
  setGrid: React.Dispatch<React.SetStateAction<GridNode[][]>>;
  startNode: GridNode;
  setStartNode: React.Dispatch<React.SetStateAction<GridNode | undefined>>;
  endNode: GridNode;
  setEndNode: React.Dispatch<React.SetStateAction<GridNode | undefined>>;
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
    } else if (nodeSelectType === NodeType.End) {
      if (endNode.x !== -1) {
        newNodes[endNode.y][endNode.x].type = NodeType.Default;
      }
      setEndNode(node);
    } else if (nodeSelectType === NodeType.Wall) {
      newNodes[node.y][node.x].isWall = true;
    } else if (nodeSelectType === NodeType.Weighted) {
      newNodes[node.y][node.x].isWeighted = true;
    }

    newNodes[node.y][node.x].type = nodeSelectType;
    setGrid(newNodes);
  };

  const handleMouseDown = (e: React.MouseEvent): void => {
    e.preventDefault();

    updateType();

    if (
      nodeSelectType === NodeType.Wall ||
      nodeSelectType === NodeType.Weighted
    ) {
      setHolding(true);
    }
  };

  const handleMouseOver = (e: React.MouseEvent): void => {
    e.preventDefault();

    if (
      (nodeSelectType === NodeType.Wall ||
        nodeSelectType === NodeType.Weighted) &&
      holding
    ) {
      updateType();
    }
  };

  let bgColor = 'bg-white';
  if (node.type === NodeType.Start) {
    bgColor = 'bg-green-500';
  } else if (node.type === NodeType.End) {
    bgColor = 'bg-red-500';
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
        className={`w-6 h-6 ${bgColor} cursor-pointer text-center`}
      >
        {node.type === NodeType.Start && <TbArrowBigRightLines size={24} />}
        {node.type === NodeType.End && <TbTarget size={24} />}
        {node.isWall && <GiBrickWall size={24} />}
        {node.isWeighted && <TbWeight size={24} />}
      </div>
    </div>
  );
};

export default Node;
