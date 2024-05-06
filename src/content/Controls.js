import React, { useRef } from 'react';
import { Box } from 'rebass';
import Knob from './Knob';
import Swapper from './Swapper';
import { useHiderContext } from './useHiderContext';
import { IconContext } from 'react-icons';

export default function Controls() {
  const { controlsHeight } = useHiderContext();
  const controlsRef = useRef();
  return (
    <Box
      ref={controlsRef}
      sx={{
        pointerEvents: 'all',
        height: `${controlsHeight}px`,
        position: 'absolute',
        top: `calc(50% - ${controlsHeight / 2}px)`,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 1,
      }}
    >
      <IconContext.Provider
        value={{ color: 'gray', className: 'global-class-name' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderImage:
              'linear-gradient(to bottom, transparent 45%, gray 45% 55%, transparent 55%) 1 1 /0px 100vw/0px calc(100vw + 5px)',
            borderRadius: `${controlsHeight / 4}px`,
            boxShadow: '0px 0px 1px 1px gray',
          }}
        >
          <Knob controlsRef={controlsRef} />
          <Swapper />
        </Box>
      </IconContext.Provider>
    </Box>
  );
}
