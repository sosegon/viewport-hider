import React, { useContext, createContext, useCallback, useState } from 'react';

const HiderContext = createContext({});

export const useHiderContext = () => useContext(HiderContext);

export default function HiderProvider({
  wrapperRef,
  primaryRef,
  secondaryRef,
  controlsRef,
  controlsSize,
  children,
}) {
  const [isVertical, setIsVertical] = useState(true);
  const [swapped, setSwapped] = useState(false);
  const swap = useCallback(() => {
    if (primaryRef.current && secondaryRef.current) {
      const primaryPointerEvents = primaryRef.current.style.pointerEvents;
      const primaryOpacity = primaryRef.current.style.opacity;
      const secondaryPointerEvents = secondaryRef.current.style.pointerEvents;
      const secondaryOpacity = secondaryRef.current.style.opacity;

      primaryRef.current.style.pointerEvents = secondaryPointerEvents;
      primaryRef.current.style.opacity = secondaryOpacity;
      secondaryRef.current.style.pointerEvents = primaryPointerEvents;
      secondaryRef.current.style.opacity = primaryOpacity;

      setSwapped(!swapped);
    }
  }, [secondaryRef, primaryRef, setSwapped, swapped]);

  const rotate = useCallback(() => {
    if (wrapperRef.current && secondaryRef.current && primaryRef.current) {
      // Change direction of wrapper
      const flexDirection = wrapperRef.current.style.flexDirection;
      wrapperRef.current.style.flexDirection =
        flexDirection === 'row' ? 'column' : 'row';

      // Convert top pane to right pane
      const topPane = {
        height: primaryRef.current.style.height,
        width: primaryRef.current.style.width,
      };
      primaryRef.current.style.width = topPane.height;
      primaryRef.current.style.height = topPane.width;

      // Convert bottom pane to left pane
      const bottomPane = {
        height: secondaryRef.current.style.height,
        width: secondaryRef.current.style.width,
      };
      secondaryRef.current.style.width = bottomPane.height;
      secondaryRef.current.style.height = bottomPane.width;

      setIsVertical(!isVertical);
    }
  }, [wrapperRef, secondaryRef, primaryRef, isVertical, setIsVertical]);

  const context = {
    wrapperRef,
    primaryRef,
    secondaryRef,
    controlsRef,
    controlsSize,
    swap,
    swapped,
    isVertical,
    rotate,
  };
  return (
    <HiderContext.Provider value={context}>{children}</HiderContext.Provider>
  );
}
