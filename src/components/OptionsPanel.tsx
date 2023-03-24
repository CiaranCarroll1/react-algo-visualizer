import React from 'react';
import { NodeType } from '../model';

type Props = {
  nodeSelectType: NodeType;
  setNodeSelectType: React.Dispatch<React.SetStateAction<NodeType>>;
  resetAll: () => void;
};

const OptionsPanel: React.FC<Props> = ({
  nodeSelectType,
  setNodeSelectType,
  resetAll,
}: Props) => {
  const handleNodeTypeSelectionChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNodeSelectType(event.currentTarget.value as NodeType);
  };

  const handleAlgorithmSelectionChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Set algorithm
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
          value="brute"
          name="algorithm"
          checked={true}
          onChange={handleAlgorithmSelectionChanged}
        />{' '}
        Brute force
      </label>
      <label>
        <input
          type="radio"
          value="dijkstra"
          name="algorithm"
          checked={false}
          onChange={handleAlgorithmSelectionChanged}
        />{' '}
        Dijkstra
      </label>
      <label>
        <input
          type="radio"
          value="astar"
          name="algorithm"
          checked={false}
          onChange={handleAlgorithmSelectionChanged}
        />{' '}
        A*
      </label>

      {/* Seperator */}
      <hr className="border-gray-300 my-5"></hr>

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
