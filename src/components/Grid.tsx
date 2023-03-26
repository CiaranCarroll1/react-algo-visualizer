import React from 'react';
import Node from './Node';
import { GridNode, NodeType, Algorithm } from '../types';

type Props = {
  nodeSelectType: NodeType;
  algorithm: Algorithm;
  grid: GridNode[][];
  setGrid: React.Dispatch<React.SetStateAction<GridNode[][]>>;
  startNode: GridNode;
  setStartNode: React.Dispatch<React.SetStateAction<GridNode | undefined>>;
  endNode: GridNode;
  setEndNode: React.Dispatch<React.SetStateAction<GridNode | undefined>>;
  holding: Boolean;
  setHolding: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Grid: React.FC<Props> = ({
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
    <div className="w-full flex flex-col items-center pt-3">
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

export default Grid;
