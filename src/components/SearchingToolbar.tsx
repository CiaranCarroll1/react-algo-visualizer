import React from 'react';
import Toolbar, { ToolbarButtonProps } from './Toolbar';
import { buttonClasses, actionButtonClasses } from './../classes';
import { RxPlay, RxReset } from 'react-icons/rx';
import { Algorithm, NumberNode } from '../types';

type Props = {
  numberNodes: NumberNode[];
  searchNumber: number;
  setSearchNumber: React.Dispatch<React.SetStateAction<number>>;
  algorithm: Algorithm;
  setAlgorithm: React.Dispatch<React.SetStateAction<Algorithm>>;
  handlePlayClick: () => void;
  handleResetClick: () => void;
};

const SearchingToolbar: React.FC<Props> = ({
  numberNodes,
  searchNumber,
  setSearchNumber,
  algorithm,
  setAlgorithm,
  handlePlayClick,
  handleResetClick,
}: Props) => {
  const buttonGroup1: ToolbarButtonProps[] = [
    {
      clickHandler: () =>
        setSearchNumber(numberNodes[Math.floor(Math.random() * 54)].num),
      classes: buttonClasses(1, 0),
      children: <>Randomize</>,
    },
  ];
  const buttonGroup2: ToolbarButtonProps[] = [
    {
      clickHandler: () => setAlgorithm(Algorithm.Linear),
      classes: buttonClasses(algorithm, Algorithm.Linear),
      children: <>Linear</>,
    },
    {
      clickHandler: () => setAlgorithm(Algorithm.Binary),
      classes: buttonClasses(algorithm, Algorithm.Binary),
      children: <>Binary</>,
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

export default SearchingToolbar;
