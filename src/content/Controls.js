import React, { useRef } from 'react';
import { Box } from 'rebass';
import Knob from './Knob';
import Swapper from './Swapper';
import { useHiderContext } from './useHiderContext';
import { IconContext } from 'react-icons';
import Direction from './Direction';

export default function Controls() {
  const { controlsSize, isVertical } = useHiderContext();
  const controlsRef = useRef();
  const borderImage = isVertical
    ? 'linear-gradient(to bottom, transparent 45%, gray 45% 55%, transparent 55%) 1 1 /0px 100vw/0px calc(100vw + 5px)'
    : 'linear-gradient(to right, transparent 45%, gray 45% 55%, transparent 55%) 1 1 /100vh 0px/calc(100vh + 5px) 0px';

  return (
    <Box
      ref={controlsRef}
      sx={{
        pointerEvents: 'all',
        height: `${isVertical ? controlsSize + 'px' : '100%'}`,
        position: 'absolute',
        left: isVertical ? '0' : `calc(50% - ${controlsSize / 2}px)`,
        top: isVertical ? `calc(50% - ${controlsSize / 2}px)` : '0',
        width: `${isVertical ? '100%' : controlsSize + 'px'}`,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}
    >
      <IconContext.Provider
        value={{ color: 'gray', className: 'global-class-name' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isVertical ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderImage,
            borderRadius: `${controlsSize / 4}px`,
            boxShadow: '0px 0px 1px 1px gray',
          }}
        >
          <Direction />
          <Knob controlsRef={controlsRef} />
          <Swapper />
        </Box>
      </IconContext.Provider>
    </Box>
  );
}
