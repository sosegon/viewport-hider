import React, { useEffect, useRef } from 'react';
import { MdDragHandle } from 'react-icons/md';
import { useHiderContext } from './useHiderContext';
import { ControlWrapper } from './Controls.style';

export default function Knob({ controlsRef }) {
  const { topRef, controlsHeight } = useHiderContext();

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
    <ControlWrapper
      onMouseDown={handleMouseDown}
      sx={{
        width: `${3 * controlsHeight}px`,
        height: `${controlsHeight}px`,
        cursor: 'ns-resize',
      }}
    >
      <MdDragHandle size={'100%'} />
    </ControlWrapper>
  );
}
