import React, { useState } from 'react';
import { NumberNode, SearchState, Algorithm } from '../types';
import SearchingToolbar from './SearchingToolbar';

const getFibonacciNumber = (num: number): number => {
  if (num === 0) return 0;

  let sum = 0;
  for (let i = 1; i < num; i++) {
    sum += i;
  }
  return sum;
};

const initialNumberNodes: NumberNode[] = [];
for (let i = 0; i < 20; i++) {
  initialNumberNodes.push({
    num: getFibonacciNumber(i),
    state: SearchState.None,
  });
}

const Searching = () => {
  const [searchNumber, setSearchNumber] = useState<number>(
    initialNumberNodes[10].num
  );
  const [numberNodes, setNumberNodes] = useState<NumberNode[]>(
    JSON.parse(JSON.stringify(initialNumberNodes))
  );
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.Linear);

  const play = (): void => {
    if (algorithm === Algorithm.Linear) {
      linearSearch();
    } else {
      binarySearch();
    }
  };
  const reset = (): void => {
    setNumberNodes(JSON.parse(JSON.stringify(initialNumberNodes)));
  };

  const linearSearch = (): void => {
    for (
      let i = 0;
      i < numberNodes.length && numberNodes[i].num <= searchNumber;
      i++
    )
      setTimeout(() => {
        const newNodes = [...numberNodes];
        if (i > 0) newNodes[i - 1].state = SearchState.None;

        const currNode = newNodes[i];
        if (newNodes[i].num === searchNumber) {
          currNode.state = SearchState.Found;
        } else {
          currNode.state = SearchState.Current;
        }

        setNumberNodes(newNodes);
      }, 200 * i);
  };

  const binarySearch = (): void => {};

  const getBorderColor = (node: NumberNode) => {
    if (node.state === SearchState.Current) {
      return 'bg-blue-500';
    } else if (node.state === SearchState.Found) {
      return 'bg-yellow-500';
    } else {
      return 'bg-white';
    }
  };

  return (
    <div>
      <SearchingToolbar
        numberNodes={numberNodes}
        searchNumber={searchNumber}
        setSearchNumber={setSearchNumber}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        handlePlayClick={play}
        handleResetClick={reset}
      />

      <div className="w-full h-[600px] flex flex-wrap gap-8 justify-center items-center pt-3">
        {numberNodes.map((node, index) => {
          return (
            <div
              key={index}
              className={`w-[120px] h-[120px] flex justify-center items-center text-2xl border-4 ${
                node.num === searchNumber ? 'border-red-500' : ''
              } text-center ${getBorderColor(node)}`}
            >
              {node.num}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Searching;
