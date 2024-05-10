import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Controls from './content/Controls';
import Pane from './content/Pane';
import HiderProvider from './content/useHiderContext';
import './content/styles.css';
import { Box } from 'rebass';

function Content() {
  const wrapperRef = useRef();
  const primaryRef = useRef();
  const secondaryRef = useRef();
  const controlsRef = useRef();
  const controlsSize = 20;

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

  return (
    <HiderProvider
      wrapperRef={wrapperRef}
      primaryRef={primaryRef}
      secondaryRef={secondaryRef}
      controlsRef={controlsRef}
      controlsSize={controlsSize}
    >
      <Box
        ref={wrapperRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <Pane ref={primaryRef} sx={{ backdropFilter: 'blur(20px)' }} />
        <Controls ref={controlsRef} />
        <Pane ref={secondaryRef} sx={{ backdropFilter: 'blur(20px)' }} />
      </Box>
    </HiderProvider>
  );
}

const root = document.createElement('div');
root.id = 'viewport-hider-root';

document.body.append(root);

ReactDOM.render(<Content />, document.getElementById('viewport-hider-root'));
