import React, { useState } from 'react';
import Node from './Node';
import { NodeT, Coords } from './../model';

type Props = {
  nodeSelectType: string;
  nodes: NodeT[][];
  setNodes: React.Dispatch<React.SetStateAction<NodeT[][]>>;
  startCoords: Coords;
  setStartCoords: React.Dispatch<React.SetStateAction<Coords>>;
  endCoords: Coords;
  setEndCoords: React.Dispatch<React.SetStateAction<Coords>>;
};

const Board: React.FC<Props> = ({
  nodeSelectType,
  nodes,
  setNodes,
  startCoords,
  setStartCoords,
  endCoords,
  setEndCoords,
}) => {
  const [holding, setHolding] = useState<Boolean>(false);

  return (
    <div className="bg-[#0B0B45] col-span-4 flex flex-col">
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
