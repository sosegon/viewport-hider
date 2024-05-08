import React, {
  useContext,
  createContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { saveParam, getParam } from './persistance';
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
      saveParam('swapped', !swapped);
    }
  }, [secondaryRef, primaryRef, setSwapped, swapped]);

  const rotate = useCallback(() => {
    if (
      wrapperRef.current &&
      secondaryRef.current &&
      primaryRef.current &&
      controlsRef.current
    ) {
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

      // Update position of controls
      const left = controlsRef.current.style.left;
      const top = controlsRef.current.style.top;
      controlsRef.current.style.left = top;
      controlsRef.current.style.top = left;

      setIsVertical(!isVertical);
      saveParam('isVertical', !isVertical);
    }
  }, [
    wrapperRef,
    secondaryRef,
    primaryRef,
    controlsRef,
    isVertical,
    setIsVertical,
  ]);

  const saveRefsStyle = useCallback(() => {
    if (
      primaryRef.current &&
      secondaryRef.current &&
      controlsRef.current &&
      wrapperRef.current
    ) {
      saveParam(
        'refStyles',
        JSON.stringify({
          primary: {
            pointerEvents: primaryRef.current.style.pointerEvents,
            opacity: primaryRef.current.style.opacity,
            width: primaryRef.current.style.width,
            height: primaryRef.current.style.height,
          },
          secondary: {
            pointerEvents: secondaryRef.current.style.pointerEvents,
            opacity: secondaryRef.current.style.opacity,
            width: secondaryRef.current.style.width,
            height: secondaryRef.current.style.height,
            flexGrow: secondaryRef.current.style.flexGrow,
          },
          controls: {
            top: controlsRef.current.style.top,
            left: controlsRef.current.style.left,
          },
          wrapper: {
            flexDirection: wrapperRef.current.style.flexDirection,
          },
        })
      );
    }
  }, [primaryRef, secondaryRef, controlsRef, wrapperRef]);

  // Set swapped from stored value at start
  useEffect(() => {
    getParam('swapped', res => {
      const savedSwapper = res['swapped'] ?? swapped;
      if (savedSwapper !== swapped) {
        setSwapped(savedSwapper);
      }
    });
  }, []);

  // Set isVertical from stored value at start
  useEffect(() => {
    getParam('isVertical', res => {
      const savedIsVertical = res['isVertical'] ?? isVertical;
      if (savedIsVertical !== isVertical) {
        setIsVertical(savedIsVertical);
      }
    });
  }, []);

  // Set styles from stored values
  useEffect(() => {
    getParam('refStyles', res => {
      const styles = JSON.parse(res['refStyles'] ?? '{}');
      if (styles?.primary) {
        Object.keys(styles.primary).forEach(k => {
          primaryRef.current.style[k] = styles.primary[k];
        });
      }
      if (styles?.secondary) {
        Object.keys(styles.secondary).forEach(k => {
          secondaryRef.current.style[k] = styles.secondary[k];
        });
      }
      if (styles?.controls) {
        Object.keys(styles.controls).forEach(k => {
          controlsRef.current.style[k] = styles.controls[k];
        });
      }
      if (styles?.wrapper) {
        Object.keys(styles.wrapper).forEach(k => {
          wrapperRef.current.style[k] = styles.wrapper[k];
        });
      }
    });
  }, []);

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
    saveRefsStyle,
  };
  return (
    <HiderContext.Provider value={context}>{children}</HiderContext.Provider>
  );
}
