import React from 'react';
import { PiSquareHalfFill } from 'react-icons/pi';
import { useHiderContext } from './useHiderContext';
import { ControlWrapper } from './Controls.style';

export default function Swapper() {
  const { controlsHeight, swap, swapped } = useHiderContext();

  return (
    <ControlWrapper
      onClick={swap}
      sx={{
        width: `${controlsHeight}px`,
        height: `${controlsHeight}px`,
        cursor: 'pointer',
        svg: {
          transform: `rotateZ(${swapped ? '90deg' : '-90deg'})`,
          transition: 'transform 0.3s ease',
        },
      }}
    >
      <PiSquareHalfFill />
    </ControlWrapper>
  );
}
