import React from 'react';
import { RxPlay, RxReset } from 'react-icons/rx';

type Props = {
  handlePlayClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleResetClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Navbar: React.FC<Props> = ({
  handlePlayClick,
  handleResetClick,
}: Props) => {
  return (
    <div className="w-full h-[50px] px-4 flex justify-between items-center text-gray-300">
      <h1 className="p-2 select-none text-yellow-500 text-3xl bold">
        Algo Visualizer
      </h1>
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
  );
};

export default Navbar;
