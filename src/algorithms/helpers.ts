import { GridNode } from '../types';

export const getNeighbors = (
  node: GridNode,
  grid: GridNode[][]
): GridNode[] => {
  let neighbors = [];
  let x = node.x;
  let y = node.y;

  if (x > 0) {
    neighbors.push(grid[y][x - 1]);
  }
  if (x < grid[0].length - 1) {
    neighbors.push(grid[y][x + 1]);
  }
  if (y > 0) {
    neighbors.push(grid[y - 1][x]);
  }
  if (y < grid.length - 1) {
    neighbors.push(grid[y + 1][x]);
  }

  return neighbors;
};

export const getPathFromNode = (node: GridNode): GridNode[] => {
  let path = [];
  let temp = node;
  while (temp.previous) {
    path.push(temp);
    temp = temp.previous;
  }
  return path;
};
