import { GridNode, Result } from '../../types';
import { getNeighbors, getPathFromNode } from './helpers';

export const bfs = (
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode
): Result | null => {
  let openList: GridNode[] = [];
  let closedList: GridNode[] = [];

  openList.push(startNode);

  while (openList.length > 0) {
    const currentNode = openList[0];

    openList.splice(openList.indexOf(currentNode), 1);
    closedList.push(currentNode);

    if (currentNode === endNode) {
      return {
        path: getPathFromNode(currentNode),
        visited: closedList,
      };
    }

    let neighbors = getNeighbors(currentNode, grid);
    neighbors.forEach((neighbor) => {
      if (
        !openList.includes(neighbor) &&
        !closedList.includes(neighbor) &&
        !neighbor.isWall
      ) {
        openList.push(neighbor);
      }
    });
  }

  return null;
};
