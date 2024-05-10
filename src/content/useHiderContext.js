import React, {
  useContext,
  createContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { saveParam, getParam } from 'Common/persistance';
import { convertScale, clampStyle } from './utils';
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
  }, [setSwapped, swapped]);

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

      // Convert top pane to left pane
      const topPane = {
        height: clampStyle(
          convertScale(
            parseInt(primaryRef.current.style.height),
            window.innerHeight,
            window.innerWidth
          ),
          controlsSize,
          window.innerWidth - controlsSize
        ),
        width: clampStyle(
          convertScale(
            parseInt(primaryRef.current.style.width),
            window.innerWidth,
            window.innerHeight
          ),
          controlsSize,
          window.innerHeight - controlsSize
        ),
      };
      primaryRef.current.style.width = `${parseInt(
        !isVertical ? window.innerWidth : topPane.height
      )}px`;
      primaryRef.current.style.height = `${parseInt(
        isVertical ? window.innerHeight : topPane.width
      )}px`;

      // Convert bottom pane to right pane
      const bottomPane = {
        height: secondaryRef.current.style.height,
        width: secondaryRef.current.style.width,
      };
      secondaryRef.current.style.width = bottomPane.height;
      secondaryRef.current.style.height = bottomPane.width;

      // Update position of controls
      const left = controlsRef.current.style.left;
      const top = controlsRef.current.style.top;
      controlsRef.current.style.top =
        left === '0px'
          ? '0px'
          : `${clampStyle(
              parseInt(primaryRef.current.style.height.slice(0, -2)) -
                controlsSize / 2,
              controlsSize / 2,
              window.innerHeight - controlsSize * 1.5
            )}`;
      controlsRef.current.style.left =
        top === '0px'
          ? '0px'
          : `${clampStyle(
              parseInt(primaryRef.current.style.width.slice(0, -2)) -
                controlsSize / 2,
              controlsSize / 2,
              window.innerWidth - controlsSize * 1.5
            )}`;

      setIsVertical(!isVertical);
      saveParam('isVertical', !isVertical);
    }
  }, [isVertical, setIsVertical, controlsSize]);

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
  }, []);

  // Sets initial style in elements
  useEffect(() => {
    if (primaryRef.current) {
      primaryRef.current.style.height = `${window.innerHeight / 2}px`;
      primaryRef.current.style.width = `${window.innerWidth}px`;
      primaryRef.current.style.pointerEvents = 'none';
      primaryRef.current.style.opacity = 0;
    }
    if (secondaryRef.current) {
      secondaryRef.current.style.width = '100%';
      secondaryRef.current.style.flexGrow = 1;
      secondaryRef.current.style.pointerEvents = 'all';
      secondaryRef.current.style.opacity = 1;
    }
    if (controlsRef.current) {
      controlsRef.current.style.top = `${(window.innerHeight - controlsSize) / 2}px`;
      controlsRef.current.style.left = '0px';
    }
  }, [primaryRef, secondaryRef, controlsRef]);

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

  // Set visibility at start
  useEffect(() => {
    getParam('on', res => {
      const savedOn = res['on'] ?? true;
      const root = document.getElementById('viewport-hider-root');
      root.style.display = savedOn ? 'flex' : 'none';
    });
  }, []);

  // Receives toggle from popup
  useEffect(() => {
    chrome.runtime.onMessage.addListener(({ command, value }) => {
      const root = document.getElementById('viewport-hider-root');
      if (command === 'toggle' && root) {
        root.style.display = value ? 'flex' : 'none';
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
