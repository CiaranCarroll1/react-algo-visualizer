import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="fixed w-full h-[80px] px-4 flex justify-between items-center text-blue-900 bg-gray-300">
      <h1 className="select-none text-3xl bold">Algo Visualizer</h1>
    </div>
  );
};

export default Navbar;
