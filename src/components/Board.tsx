import React from 'react';
import Node from './Node';
import { BoardNode, Coords, NodeType, Algorithm } from './../model';

type Props = {
  nodeSelectType: NodeType;
  algorithm: Algorithm;
  nodes: BoardNode[][];
  setNodes: React.Dispatch<React.SetStateAction<BoardNode[][]>>;
  startCoords: Coords;
  setStartCoords: React.Dispatch<React.SetStateAction<Coords>>;
  endCoords: Coords;
  setEndCoords: React.Dispatch<React.SetStateAction<Coords>>;
  holding: Boolean;
  setHolding: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Board: React.FC<Props> = ({
  nodeSelectType,
  algorithm,
  nodes,
  setNodes,
  startCoords,
  setStartCoords,
  endCoords,
  setEndCoords,
  holding,
  setHolding,
}) => {
  return (
    <div className="col-span-4 flex flex-col">
      {nodes.map((row, y) => {
        return (
          <div key={y} className="flex">
            {row.map((node, x) => {
              return (
                <Node
                  key={x + y}
                  nodeSelectType={nodeSelectType}
                  node={node}
                  nodes={nodes}
                  setNodes={setNodes}
                  startCoords={startCoords}
                  setStartCoords={setStartCoords}
                  endCoords={endCoords}
                  setEndCoords={setEndCoords}
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
