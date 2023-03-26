export type BoardNode = {
  type: NodeType;
  x: number;
  y: number;
  g: number;
  f: number;
  h: number;
  previous: BoardNode | null;
};

export type Result = {
  path: BoardNode[];
  visited: BoardNode[];
};

export enum NodeType {
  Default = 'default',
  Start = 'start',
  End = 'end',
  Wall = 'wall',
  Visited = 'visited',
  Path = 'path',
}

export enum Algorithm {
  Brute = 'brute',
  Dijkstra = 'dijkstra',
  Astar = 'astar',
}
