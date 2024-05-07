import React, { useContext, createContext, useCallback, useState } from 'react';

const HiderContext = createContext({});

export const useHiderContext = () => useContext(HiderContext);

export default function HiderProvider({
  wrapperRef,
  topRef,
  bottomRef,
  controlsSize,
  children,
}) {
  const [isVertical, setIsVertical] = useState(true);
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

  const rotate = useCallback(() => {
    if (wrapperRef.current && bottomRef.current && topRef.current) {
      // Change direction of wrapper
      const flexDirection = wrapperRef.current.style.flexDirection;
      wrapperRef.current.style.flexDirection =
        flexDirection === 'row' ? 'column' : 'row';

      // Convert top pane to right pane
      const topPane = {
        height: topRef.current.style.height,
        width: topRef.current.style.width,
      };
      topRef.current.style.width = topPane.height;
      topRef.current.style.height = topPane.width;

      // Convert bottom pane to left pane
      const bottomPane = {
        height: bottomRef.current.style.height,
        width: bottomRef.current.style.width,
      };
      bottomRef.current.style.width = bottomPane.height;
      bottomRef.current.style.height = bottomPane.width;

      setIsVertical(!isVertical);
    }
  }, [wrapperRef, bottomRef, topRef, isVertical, setIsVertical]);

  const context = {
    wrapperRef,
    controlsSize,
    topRef,
    bottomRef,
    swap,
    swapped,
    isVertical,
    rotate,
  };
  return (
    <HiderContext.Provider value={context}>{children}</HiderContext.Provider>
  );
}
