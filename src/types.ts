export type GridNode = {
  type: NodeType;
  x: number;
  y: number;
  g: number;
  f: number;
  h: number;
  previous: GridNode | null;
  isWall: Boolean;
  isWeighted: Boolean;
};

export type Result = {
  path: GridNode[];
  visited: GridNode[];
};

export enum NodeType {
  Default = 'default',
  Start = 'start',
  End = 'end',
  Wall = 'wall',
  Weighted = 'weighted',
  Visited = 'visited',
  Path = 'path',
}

export enum Algorithm {
  Brute = 'brute',
  Dijkstra = 'dijkstra',
  Astar = 'astar',
}
