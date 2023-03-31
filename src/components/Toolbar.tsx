import React, { ReactNode } from 'react';

export type ToolbarButtonProps = {
  clickHandler: () => void;
  classes: string;
  children: ReactNode;
};

type Props = {
  buttonGroup1?: ToolbarButtonProps[];
  buttonGroup2?: ToolbarButtonProps[];
  actionButtonGroup?: ToolbarButtonProps[];
};

const Toolbar: React.FC<Props> = ({
  buttonGroup1,
  buttonGroup2,
  actionButtonGroup,
}: Props) => {
  const showSeperator = (): Boolean => {
    if (
      buttonGroup1 &&
      buttonGroup2 &&
      buttonGroup1.length > 0 &&
      buttonGroup2.length > 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="px-2 w-full">
      <div className="flex w-full py-2 justify-between text-gray-300 text-xl border-y-2 border-gray-300">
        {/* Group 1 */}
        <div className="flex">
          {buttonGroup1?.map((buttonProps, index) => {
            return (
              <button
                key={index}
                onClick={buttonProps.clickHandler}
                className={buttonProps.classes}
              >
                {buttonProps.children}
              </button>
            );
          })}

          {showSeperator() && <div className="border mx-4"></div>}

          {/* Group 2 */}
          {buttonGroup2?.map((buttonProps, index) => {
            return (
              <button
                key={index}
                onClick={buttonProps.clickHandler}
                className={buttonProps.classes}
              >
                {buttonProps.children}
              </button>
            );
          })}
        </div>

        {/* Action group */}
        <div className="flex">
          {actionButtonGroup?.map((buttonProps, index) => {
            return (
              <button
                key={index}
                onClick={buttonProps.clickHandler}
                className={buttonProps.classes}
              >
                {buttonProps.children}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
