import React from 'react';
import { NodeType, Algorithm } from '../model';

type Props = {
  nodeSelectType: NodeType;
  setNodeSelectType: React.Dispatch<React.SetStateAction<NodeType>>;
  algorithm: Algorithm;
  setAlgorithm: React.Dispatch<React.SetStateAction<Algorithm>>;
  resetAll: () => void;
  start: () => void;
};

const OptionsPanel: React.FC<Props> = ({
  nodeSelectType,
  setNodeSelectType,
  algorithm,
  setAlgorithm,
  resetAll,
  start,
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

  return (
    <div className="col-span-1 flex flex-col text-gray-300 text-xl p-5 border border-gray-300">
      {/* Algorithm */}
      <h2 className="text-2xl underline">Type of node</h2>
      <label>
        <input
          type="radio"
          value={NodeType.Start}
          name="selection"
          checked={nodeSelectType === NodeType.Start}
          onChange={handleNodeTypeSelectionChanged}
        />{' '}
        Start
      </label>
      <label>
        <input
          type="radio"
          value={NodeType.End}
          name="selection"
          checked={nodeSelectType === NodeType.End}
          onChange={handleNodeTypeSelectionChanged}
        />{' '}
        End
      </label>
      <label>
        <input
          type="radio"
          value={NodeType.Wall}
          name="selection"
          checked={nodeSelectType === NodeType.Wall}
          onChange={handleNodeTypeSelectionChanged}
        />{' '}
        Wall
      </label>

      {/* Seperator */}
      <hr className="border-gray-300 my-5"></hr>

      {/* Algorithm */}
      <h2 className="text-2xl underline">Algorithm</h2>
      <label>
        <input
          type="radio"
          value={Algorithm.Brute}
          name="algorithm"
          checked={algorithm === Algorithm.Brute}
          onChange={handleAlgorithmSelectionChanged}
        />{' '}
        Brute force
      </label>
      <label>
        <input
          type="radio"
          value={Algorithm.Dijkstra}
          name="algorithm"
          checked={algorithm === Algorithm.Dijkstra}
          onChange={handleAlgorithmSelectionChanged}
        />{' '}
        Dijkstra
      </label>
      <label>
        <input
          type="radio"
          value={Algorithm.Astar}
          name="algorithm"
          checked={algorithm === Algorithm.Astar}
          onChange={handleAlgorithmSelectionChanged}
        />{' '}
        A*
      </label>

      {/* Seperator */}
      <hr className="border-gray-300 my-5"></hr>

      <button
        onClick={start}
        className="p-1 border mb-5 text-[#0B0B45] bg-gray-300 border-gray-300 rounded"
      >
        Start
      </button>
      <button
        onClick={resetAll}
        className="p-1 border text-[#0B0B45] bg-gray-300 border-gray-300 rounded"
      >
        Reset
      </button>
    </div>
  );
};

export default OptionsPanel;
