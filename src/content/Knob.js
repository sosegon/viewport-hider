import React, { useEffect, useRef } from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

export default function Knob({ topRef, controlsRef, controlsHeight }) {
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  // Function to handle mouse down event
  function handleMouseDown(event) {
    isDraggingRef.current = true;
    startYRef.current = event.clientY;
    startHeightRef.current = topRef.current.style.height;
  }

  // Function to handle mouse move event
  function handleMouseMove(event) {
    if (isDraggingRef.current) {
      const deltaY = event.clientY - startYRef.current;
      const newHeight = `calc(${startHeightRef.current} + ${deltaY}px)`;
      topRef.current.style.height = newHeight;
      controlsRef.current.style.top = `calc(${startHeightRef.current} + ${
        deltaY - controlsHeight / 2
      }px)`;
    }
  }

  // Function to handle mouse up event
  function handleMouseUp() {
    isDraggingRef.current = false;
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <Box
      onMouseDown={handleMouseDown}
      sx={{
        width: `${2 * controlsHeight}px`,
        height: `${controlsHeight}px`,
        color: '#fff',
        boxSizing: 'border-box',
        zIndex: '9999',
        cursor: 'ns-resize',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        px: '6px',
        borderRadius: `${controlsHeight / 4}px`,
        boxShadow: '0px 0px 1px 1px gray',
      }}
    >
      <Line />
      <Line />
    </Box>
  );
}

const Line = styled(Box).attrs(() => ({
  sx: {
    backgroundColor: 'gray',
    height: '2px',
    borderRadius: '1px',
    width: '100%',
  },
}))``;
