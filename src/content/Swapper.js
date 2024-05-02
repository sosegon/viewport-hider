import React from 'react';
import { Box } from 'rebass';
import { useHiderContext } from './useHiderContext';

export default function Swapper() {
  const { controlsHeight, swap, swapped } = useHiderContext();

  return (
    <Box
      onClick={swap}
      sx={{
        width: `${controlsHeight}px`,
        height: `${controlsHeight}px`,
        color: '#fff',
        boxSizing: 'border-box',
        zIndex: '9999',
        cursor: 'pointer',
        background: `linear-gradient(to bottom, ${swapped ? '#ccc' : 'white'} 50%, ${!swapped ? '#ccc' : 'white'} 50%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        px: '6px',
        borderRadius: `${controlsHeight / 4}px`,
        boxShadow: '0px 0px 1px 1px gray',
      }}
    ></Box>
  );
}
