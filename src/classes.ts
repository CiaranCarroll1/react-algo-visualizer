import { NodeType, Algorithm } from './types';

export const buttonClasses = (
  type1: NodeType | Algorithm | number,
  type2: NodeType | Algorithm | number
) => {
  return `px-3 mx-2 flex items-center hover:bg-yellow-500 rounded disabled:bg-gray-600 disabled:hover:bg-gray-600 ${
    type1 === type2 ? 'border border-yellow-500' : ''
  }`;
};

export const actionButtonClasses =
  'flex items-center px-5 py-1 mx-2 border text-xl text-[#0B0B45] bg-gray-300 hover:bg-yellow-500 border-gray-300 hover:border-yellow-500 rounded';
