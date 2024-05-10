import React, { useRef } from 'react';
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
