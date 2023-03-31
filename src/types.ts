export enum NodeType {
  Default = 'default',
  Start = 'start',
  End = 'end',
  Wall = 'wall',
  Weighted = 'weighted',
  Visited = 'visited',
  Path = 'path',
}

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

export enum Algorithm {
  Dijkstra = 'dijkstra',
  Astar = 'astar',
  BFS = 'bfs',
  Linear = 'linear',
  Binary = 'binary',
}

export type NumberNode = {
  num: number;
  state: SearchState;
};

export enum SearchState {
  None = 'none',
  Current = 'current',
  Found = 'found',
}
