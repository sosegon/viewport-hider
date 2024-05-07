import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Controls from './content/Controls';
import Pane from './content/Pane';
import HiderProvider from './content/useHiderContext';
import './content/styles.css';
import { Box } from 'rebass';

const CONTROLS_SIZE = 20;

function Content() {
  const wrapperRef = useRef();
  const topPaneRef = useRef();
  const bottomPaneRef = useRef();

  useEffect(() => {
    if (topPaneRef.current) {
      topPaneRef.current.style.height = `${window.innerHeight / 2}px`;
      topPaneRef.current.style.width = `${window.innerWidth}px`;
      topPaneRef.current.style.pointerEvents = 'none';
      topPaneRef.current.style.opacity = 0;
    }
    if (bottomPaneRef.current) {
      bottomPaneRef.current.style.width = '100%';
      bottomPaneRef.current.style.flexGrow = 1;
      bottomPaneRef.current.style.pointerEvents = 'all';
      bottomPaneRef.current.style.opacity = 1;
    }
  }, [topPaneRef, bottomPaneRef]);

  return (
    <HiderProvider
      wrapperRef={wrapperRef}
      topRef={topPaneRef}
      bottomRef={bottomPaneRef}
      controlsSize={CONTROLS_SIZE}
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
        <Pane ref={topPaneRef} sx={{ backdropFilter: 'blur(20px)' }} />
        <Controls />
        <Pane ref={bottomPaneRef} sx={{ backdropFilter: 'blur(20px)' }} />
      </Box>
    </HiderProvider>
  );
}

const root = document.createElement('div');
root.id = 'viewport-hider-root';

document.body.append(root);

ReactDOM.render(<Content />, document.getElementById('viewport-hider-root'));
