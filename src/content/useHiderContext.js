import React, { useContext, createContext, useCallback, useState } from 'react';

const HiderContext = createContext({});

export const useHiderContext = () => useContext(HiderContext);

export default function HiderProvider({
  topRef,
  bottomRef,
  controlsHeight,
  children,
}) {
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

  const context = {
    controlsHeight,
    topRef,
    bottomRef,
    swap,
    swapped,
  };
  return (
    <HiderContext.Provider value={context}>{children}</HiderContext.Provider>
  );
}
