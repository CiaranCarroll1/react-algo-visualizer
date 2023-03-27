import React from 'react';
import { NodeType, Algorithm } from '../types';
import {
  TbArrowBigRightLines,
  TbTarget,
  TbWall,
  TbWeight,
} from 'react-icons/tb';
import { RxPlay, RxReset } from 'react-icons/rx';

type Props = {
  nodeSelectType: NodeType;
  setNodeSelectType: React.Dispatch<React.SetStateAction<NodeType>>;
  algorithm: Algorithm;
  setAlgorithm: React.Dispatch<React.SetStateAction<Algorithm>>;
  handlePlayClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleResetClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Toolbar: React.FC<Props> = ({
  nodeSelectType,
  setNodeSelectType,
  algorithm,
  setAlgorithm,
  handlePlayClick,
  handleResetClick,
}: Props) => {
  const nodeTypeButtonClasses = (type: NodeType) => {
    return `px-3 mx-2 flex items-center hover:bg-yellow-500 rounded ${
      nodeSelectType === type ? 'border border-yellow-500' : ''
    }`;
  };

  const algorithmButtonClasses = (algo: Algorithm) => {
    return `px-3 mx-2 flex items-center hover:bg-yellow-500 rounded ${
      algorithm === algo ? 'border border-yellow-500' : ''
    }`;
  };

  return (
    <div className="px-2 w-full">
      <div className="flex w-full py-2 justify-between text-gray-300 text-xl border-y-2 border-gray-300">
        {/* Node type */}
        <div className="flex">
          <button
            onClick={() => setNodeSelectType(NodeType.Start)}
            className={nodeTypeButtonClasses(NodeType.Start)}
          >
            <TbArrowBigRightLines className="pr-1" size={30} />
            Start
          </button>
          <button
            onClick={() => setNodeSelectType(NodeType.End)}
            className={nodeTypeButtonClasses(NodeType.End)}
          >
            <TbTarget className="pr-1" size={30} />
            Target
          </button>
          <button
            onClick={() => setNodeSelectType(NodeType.Wall)}
            className={nodeTypeButtonClasses(NodeType.Wall)}
          >
            <TbWall className="pr-1" size={30} />
            Wall
          </button>
          <button
            onClick={() => setNodeSelectType(NodeType.Weighted)}
            className={nodeTypeButtonClasses(NodeType.Weighted)}
          >
            <TbWeight className="pr-1" size={30} />
            Weight
          </button>

          <div className="border mx-4"></div>

          <button
            onClick={() => setAlgorithm(Algorithm.Dijkstra)}
            className={algorithmButtonClasses(Algorithm.Dijkstra)}
          >
            Dijkstra
          </button>
          <button
            onClick={() => setAlgorithm(Algorithm.Astar)}
            className={algorithmButtonClasses(Algorithm.Astar)}
          >
            A-star
          </button>
        </div>

        <div className="flex">
          <button
            onClick={handlePlayClick}
            className="flex items-center px-5 py-1 border mr-5 text-xl text-[#0B0B45] bg-gray-300 hover:bg-yellow-500 border-gray-300 hover:border-yellow-500 rounded"
          >
            <RxPlay className="pr-1" size={26} />
            Play
          </button>
          <button
            onClick={handleResetClick}
            className="flex items-center px-5 py-1 border text-xl text-[#0B0B45] bg-gray-300 hover:bg-yellow-500 border-gray-300 hover:border-yellow-500 rounded"
          >
            <RxReset className="pr-1" size={26} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
