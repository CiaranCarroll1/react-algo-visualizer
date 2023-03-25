export type BoardNode = {
  type: NodeType;
  x: number;
  y: number;
};

export type Coords = {
  x: number;
  y: number;
};

export enum NodeType {
  Default = 'default',
  Start = 'start',
  End = 'end',
  Wall = 'wall',
  Visited = 'visited',
}

export enum Algorithm {
  Brute = 'brute',
  Dijkstra = 'dijkstra',
  Astar = 'astar',
}
