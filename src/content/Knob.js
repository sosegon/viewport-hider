import React, { useEffect, useRef, useCallback } from 'react';
import { MdDragHandle } from 'react-icons/md';
import { useHiderContext } from './useHiderContext';
import { ControlWrapper } from './Controls.style';
import { clamp } from './utils';

export default function Knob() {
  const { primaryRef, controlsRef, controlsSize, isVertical, saveRefsStyle } =
    useHiderContext();

  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const startHeightRef = useRef(0);
  const startWidthRef = useRef(0);

  // Function to handle mouse down event
  function handleMouseDown(event) {
    event.preventDefault();
    isDraggingRef.current = true;
    startYRef.current = event.clientY;
    startHeightRef.current = parseInt(
      primaryRef.current.style.height.slice(0, -2),
      10
    );
    startXRef.current = event.clientX;
    startWidthRef.current = parseInt(
      primaryRef.current.style.width.slice(0, -2),
      10
    );
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
          if (primaryRef.current) primaryRef.current.style.height = newHeight;
          const newTop = `${clamp(
            startHeightRef.current + deltaY - controlsSize / 2,
            controlsSize / 2,
            window.innerHeight - controlsSize * 1.5
          )}px`;
          if (controlsRef.current) controlsRef.current.style.top = newTop;
        } else {
          if (primaryRef.current) primaryRef.current.style.width = newWidth;
          const newLeft = `${clamp(
            startWidthRef.current + deltaX - controlsSize / 2,
            controlsSize / 2,
            window.innerWidth - controlsSize * 1.5
          )}px`;
          if (controlsRef.current) controlsRef.current.style.left = newLeft;
        }
      }
    },
    [isVertical]
  );

  // Function to handle mouse up event
  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    saveRefsStyle();
  }, [saveRefsStyle]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

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
