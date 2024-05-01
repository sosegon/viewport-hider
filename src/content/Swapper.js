import React, { useCallback, useState } from 'react';
import { Box } from 'rebass';

export default function Swapper({ bottomRef, topRef, controlsHeight }) {
  const [swapped, setSwapped] = useState(false);
  const swap = useCallback(() => {
    if (bottomRef.current && topRef.current) {
      const bottomPointerEvents = bottomRef.current.style.pointerEvents;
      const topPointerEvents = topRef.current.style.pointerEvents;
      const bottomOpacity = bottomRef.current.style.opacity;
      const topOpacity = topRef.current.style.opacity;

      bottomRef.current.style.pointerEvents = topPointerEvents;
      topRef.current.style.pointerEvents = bottomPointerEvents;
      bottomRef.current.style.opacity = topOpacity;
      topRef.current.style.opacity = bottomOpacity;

      setSwapped(!swapped);
    }
  }, [bottomRef, topRef, setSwapped, swapped]);

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
