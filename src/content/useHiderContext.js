import React, { useContext, createContext } from 'react';

const HiderContext = createContext({});

export const useHiderContext = () => useContext(HiderContext);

export default function HiderProvider({
  topRef,
  bottomRef,
  controlsHeight,
  children,
}) {
  const context = {
    controlsHeight,
    topRef,
    bottomRef,
  };
  return (
    <HiderContext.Provider value={context}>{children}</HiderContext.Provider>
  );
}
