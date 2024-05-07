import React, { useCallback } from 'react';
import { PiSquareHalfFill } from 'react-icons/pi';
import { useHiderContext } from './useHiderContext';
import { ControlWrapper } from './Controls.style';

export default function Swapper() {
  const { controlsSize, swap, swapped, isVertical } = useHiderContext();

  const angle = useCallback(() => {
    return isVertical
      ? swapped
        ? '90deg'
        : '-90deg'
      : swapped
        ? '0deg'
        : '180deg';
  }, [swapped, isVertical]);

  return (
    <ControlWrapper
      onClick={swap}
      sx={{
        width: `${controlsSize}px`,
        height: `${controlsSize}px`,
        cursor: 'pointer',
        svg: {
          transform: `rotateZ(${angle()})`,
          transition: 'transform 0.3s ease',
        },
      }}
    >
      <PiSquareHalfFill />
    </ControlWrapper>
  );
}
