import { GridNode, Result } from '../../types';
import { getNeighbors, getPathFromNode } from './helpers';

const getDistance = (nodeA: GridNode, nodeB: GridNode): number => {
  let dx = Math.abs(nodeA.x - nodeB.x);
  let dy = Math.abs(nodeA.y - nodeB.y);
  return Math.sqrt(dx * dx + dy * dy);
};

export const dijkstra = (
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode,
  isAstar = false
): Result | null => {
  let openList: GridNode[] = [];
  let closedList: GridNode[] = [];

  openList.push(startNode);

  while (openList.length > 0) {
    if (isAstar) {
      openList.sort((nodeA, nodeB) => {
        return nodeA.f - nodeB.f;
      });
    } else {
      openList.sort((nodeA, nodeB) => {
        return nodeA.g - nodeB.g;
      });
    }

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

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (closedList.includes(neighbor) || neighbor.isWall) {
        continue;
      }

      const distance = neighbor.isWeighted ? 4 : 1;
      let gScore = currentNode.g + distance;

      if (!openList.includes(neighbor)) {
        openList.push(neighbor);
      } else if (gScore >= neighbor.g) {
        continue;
      }

      neighbor.g = gScore;
      if (isAstar) {
        neighbor.h = getDistance(neighbor, endNode);
        neighbor.f = neighbor.g + neighbor.h;
      }
      neighbor.previous = currentNode;
    }
  }

  return null;
};
