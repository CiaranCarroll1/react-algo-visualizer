import React from 'react';
import { NodeType, Algorithm } from '../types';
import {
  TbArrowBigRightLines,
  TbTarget,
  TbWall,
  TbWeight,
} from 'react-icons/tb';
import { RxPlay, RxReset } from 'react-icons/rx';
import Toolbar, { ToolbarButtonProps } from './Toolbar';
import { buttonClasses, actionButtonClasses } from './../classes';

type Props = {
  nodeSelectType: NodeType;
  setNodeSelectType: React.Dispatch<React.SetStateAction<NodeType>>;
  algorithm: Algorithm;
  setAlgorithm: React.Dispatch<React.SetStateAction<Algorithm>>;
  handlePlayClick: () => void;
  handleResetClick: () => void;
};

const PathfindingToolbar: React.FC<Props> = ({
  nodeSelectType,
  setNodeSelectType,
  algorithm,
  setAlgorithm,
  handlePlayClick,
  handleResetClick,
}: Props) => {
  const buttonGroup1: ToolbarButtonProps[] = [
    {
      clickHandler: () => setNodeSelectType(NodeType.Start),
      classes: buttonClasses(nodeSelectType, NodeType.Start),
      children: (
        <>
          <TbArrowBigRightLines className="pr-1" size={30} />
          Start
        </>
      ),
    },
    {
      clickHandler: () => setNodeSelectType(NodeType.End),
      classes: buttonClasses(nodeSelectType, NodeType.End),
      children: (
        <>
          <TbTarget className="pr-1" size={30} />
          End
        </>
      ),
    },
    {
      clickHandler: () => setNodeSelectType(NodeType.Wall),
      classes: buttonClasses(nodeSelectType, NodeType.Wall),
      children: (
        <>
          <TbWall className="pr-1" size={30} />
          Wall
        </>
      ),
    },
    {
      clickHandler: () => setNodeSelectType(NodeType.Weighted),
      classes: buttonClasses(nodeSelectType, NodeType.Weighted),
      children: (
        <>
          <TbWeight className="pr-1" size={30} />
          Weight
        </>
      ),
    },
  ];

  const buttonGroup2: ToolbarButtonProps[] = [
    {
      clickHandler: () => setAlgorithm(Algorithm.Dijkstra),
      classes: buttonClasses(algorithm, Algorithm.Dijkstra),
      children: <>Dijkstra</>,
    },
    {
      clickHandler: () => setAlgorithm(Algorithm.Astar),
      classes: buttonClasses(algorithm, Algorithm.Astar),
      children: <>A-star</>,
    },
    {
      clickHandler: () => setAlgorithm(Algorithm.BFS),
      classes: buttonClasses(algorithm, Algorithm.BFS),
      children: <>BFS</>,
    },
  ];

  const actionButtonGroup: ToolbarButtonProps[] = [
    {
      clickHandler: handlePlayClick,
      classes: actionButtonClasses,
      children: (
        <>
          <RxPlay className="pr-1" size={26} />
          Play
        </>
      ),
    },
    {
      clickHandler: handleResetClick,
      classes: actionButtonClasses,
      children: (
        <>
          <RxReset className="pr-1" size={26} />
          Reset
        </>
      ),
    },
  ];

  return (
    <Toolbar
      buttonGroup1={buttonGroup1}
      buttonGroup2={buttonGroup2}
      actionButtonGroup={actionButtonGroup}
    />
  );
};

export default PathfindingToolbar;
