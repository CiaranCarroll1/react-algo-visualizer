import React from 'react';
import { NodeType, Algorithm } from '../types';
import {
  TbArrowBigRightLines,
  TbTarget,
  TbWall,
  TbWeight,
} from 'react-icons/tb';

type Props = {
  nodeSelectType: NodeType;
  setNodeSelectType: React.Dispatch<React.SetStateAction<NodeType>>;
  algorithm: Algorithm;
  setAlgorithm: React.Dispatch<React.SetStateAction<Algorithm>>;
};

const OptionsBar: React.FC<Props> = ({
  nodeSelectType,
  setNodeSelectType,
  algorithm,
  setAlgorithm,
}: Props) => {
  const handleNodeTypeSelectionChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNodeSelectType(event.currentTarget.value as NodeType);
  };

  const handleAlgorithmSelectionChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAlgorithm(event.currentTarget.value as Algorithm);
  };

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
          {/* <button className="px-3 flex items-center">
        <TbWeight className="px-1" size={30} />
        Weighted
        </button> */}
        </div>

        {/* Algorithm */}
        <div className="flex">
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
      </div>
    </div>
  );
};

export default OptionsBar;