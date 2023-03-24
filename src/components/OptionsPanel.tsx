import React from 'react';

type Props = {
  nodeSelectType: string;
  setNodeSelectType: React.Dispatch<React.SetStateAction<string>>;
};

const OptionsPanel: React.FC<Props> = ({
  nodeSelectType,
  setNodeSelectType,
}: Props) => {
  const handleSelectionChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value);
    setNodeSelectType(event.currentTarget.value);
  };

  return (
    <div className="col-span-1 flex flex-col text-gray-300 text-xl p-5 border border-gray-300">
      <h2 className="text-2xl underline">Selection</h2>
      <label>
        <input
          type="radio"
          value="start"
          name="selection"
          checked={nodeSelectType === 'start'}
          onChange={handleSelectionChanged}
        />{' '}
        Start
      </label>
      <label>
        <input
          type="radio"
          value="end"
          name="selection"
          checked={nodeSelectType === 'end'}
          onChange={handleSelectionChanged}
        />{' '}
        End
      </label>
      <label>
        <input
          type="radio"
          value="wall"
          name="selection"
          checked={nodeSelectType === 'wall'}
          onChange={handleSelectionChanged}
        />{' '}
        Wall
      </label>
    </div>
  );
};

export default OptionsPanel;
