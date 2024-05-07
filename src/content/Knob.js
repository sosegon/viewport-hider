import React, { useEffect, useRef, useCallback } from 'react';
import { MdDragHandle } from 'react-icons/md';
import { useHiderContext } from './useHiderContext';
import { ControlWrapper } from './Controls.style';

export default function Knob({ controlsRef }) {
  const { topRef, controlsSize, isVertical } = useHiderContext();

  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const startHeightRef = useRef(0);
  const startWidthRef = useRef(0);

  // Function to handle mouse down event
  function handleMouseDown(event) {
    isDraggingRef.current = true;
    startYRef.current = event.clientY;
    startHeightRef.current = parseInt(
      topRef.current.style.height.slice(0, -2),
      10
    );
    startXRef.current = event.clientX;
    startWidthRef.current = parseInt(
      topRef.current.style.width.slice(0, -2),
      10
    );
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  // Function to handle mouse move event
  const handleMouseMove = useCallback(
    event => {
      if (isDraggingRef.current) {
        const deltaY = event.clientY - startYRef.current;
        const newHeight = `${clamp(
          startHeightRef.current + deltaY,
          controlsSize,
          window.innerHeight - controlsSize
        )}px`;
        const deltaX = event.clientX - startXRef.current;
        const newWidth = `${clamp(
          startWidthRef.current + deltaX,
          controlsSize,
          window.innerWidth - controlsSize
        )}px`;
        if (isVertical) {
          topRef.current.style.height = newHeight;
          const newTop = `${clamp(
            startHeightRef.current + deltaY - controlsSize / 2,
            controlsSize / 2,
            window.innerHeight - controlsSize * 1.5
          )}px`;
          controlsRef.current.style.top = newTop;
        } else {
          topRef.current.style.width = newWidth;
          const newLeft = `${clamp(
            startWidthRef.current + deltaX - controlsSize / 2,
            controlsSize / 2,
            window.innerWidth - controlsSize * 1.5
          )}px`;
          controlsRef.current.style.left = newLeft;
        }
      }
    },
    [isVertical]
  );

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
  }, [handleMouseMove]);

  useEffect(() => {
    if (isVertical || !isVertical) {
      const left = controlsRef.current.style.left;
      const top = controlsRef.current.style.top;
      controlsRef.current.style.left = top;
      controlsRef.current.style.top = left;
    }
  }, [isVertical]);

  return (
    <ControlWrapper
      onMouseDown={handleMouseDown}
      sx={{
        width: `${(isVertical ? 3 : 1) * controlsSize}px`,
        height: `${(isVertical ? 1 : 3) * controlsSize}px`,
        cursor: isVertical ? 'ns-resize' : 'ew-resize',
        svg: {
          transform: `rotateZ(${isVertical ? '0deg' : '90deg'})`,
          transition: 'transform 0.3s ease',
        },
      }}
    >
      <MdDragHandle size={'100%'} />
    </ControlWrapper>
  );
}
