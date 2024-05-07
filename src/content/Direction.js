import React from 'react';
import { PiSquareSplitVertical } from 'react-icons/pi';
import { useHiderContext } from './useHiderContext';
import { ControlWrapper } from './Controls.style';

export default function Direction() {
  const { controlsSize, rotate, isVertical } = useHiderContext();

  return (
    <ControlWrapper
      onClick={rotate}
      sx={{
        width: `${controlsSize}px`,
        height: `${controlsSize}px`,
        cursor: 'pointer',
        svg: {
          transform: `rotateZ(${isVertical ? '90deg' : '0deg'})`,
          transition: 'transform 0.3s ease',
        },
      }}
    >
      <PiSquareSplitVertical />
    </ControlWrapper>
  );
}
