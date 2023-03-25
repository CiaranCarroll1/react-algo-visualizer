import React from 'react';
import Node from './Node';
import { BoardNode, Pos, NodeType, Algorithm } from '../types';

type Props = {
  nodeSelectType: NodeType;
  algorithm: Algorithm;
  nodes: BoardNode[][];
  setNodes: React.Dispatch<React.SetStateAction<BoardNode[][]>>;
  startPos: Pos;
  setStartPos: React.Dispatch<React.SetStateAction<Pos>>;
  endPos: Pos;
  setEndPos: React.Dispatch<React.SetStateAction<Pos>>;
  holding: Boolean;
  setHolding: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Board: React.FC<Props> = ({
  nodeSelectType,
  algorithm,
  nodes,
  setNodes,
  startPos,
  setStartPos,
  endPos,
  setEndPos,
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
                  startPos={startPos}
                  setStartPos={setStartPos}
                  endPos={endPos}
                  setEndPos={setEndPos}
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
