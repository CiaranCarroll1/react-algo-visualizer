import React from 'react';
import Node from './Node';
import { BoardNode, NodeType, Algorithm } from '../types';

type Props = {
  nodeSelectType: NodeType;
  algorithm: Algorithm;
  grid: BoardNode[][];
  setGrid: React.Dispatch<React.SetStateAction<BoardNode[][]>>;
  startNode: BoardNode;
  setStartNode: React.Dispatch<React.SetStateAction<BoardNode>>;
  endNode: BoardNode;
  setEndNode: React.Dispatch<React.SetStateAction<BoardNode>>;
  holding: Boolean;
  setHolding: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Board: React.FC<Props> = ({
  nodeSelectType,
  algorithm,
  grid,
  setGrid,
  startNode,
  setStartNode,
  endNode,
  setEndNode,
  holding,
  setHolding,
}) => {
  return (
    <div className="col-span-4 flex flex-col">
      {grid.map((row, y) => {
        return (
          <div key={y} className="flex">
            {row.map((node, x) => {
              return (
                <Node
                  key={x + y}
                  nodeSelectType={nodeSelectType}
                  node={node}
                  grid={grid}
                  setGrid={setGrid}
                  startNode={startNode}
                  setStartNode={setStartNode}
                  endNode={endNode}
                  setEndNode={setEndNode}
                  holding={holding}
                  setHolding={setHolding}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
