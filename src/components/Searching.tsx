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
for (let i = 3; i < 60; i++) {
  initialNumberNodes.push({
    num: getFibonacciNumber(i),
    state: SearchState.None,
  });
}

const Searching = () => {
  const [searchNumber, setSearchNumber] = useState<number>(
    initialNumberNodes[Math.floor(initialNumberNodes.length / 2)].num
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
        if (currNode.num === searchNumber) {
          currNode.state = SearchState.Found;
        } else {
          currNode.state = SearchState.Current;
        }

        setNumberNodes(newNodes);
      }, 250 * i);
  };

  const binarySearch = (): void => {
    let low = 0;
    let high = numberNodes.length - 1;
    let lowPath: number[] = [];
    let highPath: number[] = [];
    let midPath: number[] = [];

    while (low <= high) {
      lowPath.push(low);
      highPath.push(high);
      const mid = Math.floor((low + high) / 2);
      midPath.push(mid);

      if (numberNodes[mid].num === searchNumber) {
        break;
      } else if (numberNodes[mid].num < searchNumber) {
        low = mid;
      } else {
        high = mid;
      }
    }

    for (let i = 0; i < midPath.length; i++) {
      setTimeout(() => {
        const newNodes = [...numberNodes];
        if (i > 0) {
          newNodes[lowPath[i - 1]].state = SearchState.None;
          newNodes[highPath[i - 1]].state = SearchState.None;
          newNodes[midPath[i - 1]].state = SearchState.None;
        }

        const lowNode = newNodes[lowPath[i]];
        const highNode = newNodes[highPath[i]];
        const midNode = newNodes[midPath[i]];
        if (midNode.num === searchNumber) {
          midNode.state = SearchState.Found;
        } else {
          lowNode.state = SearchState.Current;
          highNode.state = SearchState.Current;
          midNode.state = SearchState.Current;
        }

        setNumberNodes(newNodes);
      }, 500 * i);
    }
  };

  const getBackgroundColor = (node: NumberNode) => {
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

      <div className="w-full h-[600px] flex flex-wrap gap-4 justify-center items-center pt-3">
        {numberNodes.map((node, index) => {
          return (
            <div
              key={index}
              className={`w-[65px] h-[65px] flex justify-center items-center text-2xl border-4 ${
                node.num === searchNumber ? 'border-red-500' : ''
              } text-center ${getBackgroundColor(node)}`}
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
