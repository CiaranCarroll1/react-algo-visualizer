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
  // Create an empty open list and a closed list
  let openList: GridNode[] = [];
  let closedList: GridNode[] = [];

  // Add the starting node to the open list
  openList.push(startNode);

  // Loop until the open list is empty
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

    // Remove the current node from the open list and add it to the closed list
    openList.splice(openList.indexOf(currentNode), 1);
    closedList.push(currentNode);

    // If we have reached the end node, return the path
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

    // Get the neighbors of the current node
    let neighbors = getNeighbors(currentNode, grid);

    // Loop through each neighbor
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      // If the neighbor is in the closed list, skip it
      if (closedList.includes(neighbor) || neighbor.isWall) {
        continue;
      }

      // Calculate the new g cost
      const distance = neighbor.isWeighted ? 4 : 1;
      let gScore = currentNode.g + distance;

      // If the neighbor is not in the open list, add it
      if (!openList.includes(neighbor)) {
        openList.push(neighbor);
      } else if (gScore >= neighbor.g) {
        continue;
      }

      // Update the neighbor's g, h, and f scores
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
