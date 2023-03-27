import { GridNode } from '../types';

const getDistance = (nodeA: GridNode, nodeB: GridNode): number => {
  let dx = Math.abs(nodeA.x - nodeB.x);
  let dy = Math.abs(nodeA.y - nodeB.y);
  return Math.sqrt(dx * dx + dy * dy);
};

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

export const dijkstra = (
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode,
  useAstar = false
) => {
  let openList: GridNode[] = [];
  let closedList: GridNode[] = [];

  openList.push(startNode);

  while (openList.length > 0) {
    if (useAstar) {
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

    if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
      let path = [];
      let temp = currentNode;
      while (temp.previous) {
        path.push(temp);
        temp = temp.previous;
      }
      return {
        path: path.reverse(),
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
      if (useAstar) {
        neighbor.h = getDistance(neighbor, endNode);
        neighbor.f = neighbor.g + neighbor.h;
      }
      neighbor.previous = currentNode;
    }
  }

  return null;
};
