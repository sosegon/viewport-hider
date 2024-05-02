import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Controls from './content/Controls';
import Pane from './content/Pane';
import HiderProvider from './content/useHiderContext';
import './content/styles.css';

const CONTROLS_HEIGHT = 20;

function Content() {
  const topPaneRef = useRef();
  const bottomPaneRef = useRef();
  const topHeight = '50%';

  useEffect(() => {
    if (topPaneRef.current) {
      topPaneRef.current.style.height = topHeight;
      topPaneRef.current.style.pointerEvents = 'none';
      topPaneRef.current.style.opacity = 0;
    }
    if (bottomPaneRef.current) {
      bottomPaneRef.current.style.flexGrow = 1;
      bottomPaneRef.current.style.pointerEvents = 'all';
      bottomPaneRef.current.style.opacity = 1;
    }
  }, [topPaneRef, bottomPaneRef]);

  return (
    <HiderProvider
      topRef={topPaneRef}
      bottomRef={bottomPaneRef}
      controlsHeight={CONTROLS_HEIGHT}
    >
      <Pane ref={topPaneRef} sx={{ backdropFilter: 'blur(20px)' }} />
      <Controls />
      <Pane ref={bottomPaneRef} sx={{ backdropFilter: 'blur(20px)' }} />
    </HiderProvider>
  );
}

const root = document.createElement('div');
root.id = 'viewport-hider-root';

document.body.append(root);

setTimeout(() => {
  ReactDOM.render(<Content />, document.getElementById('viewport-hider-root'));
}, 1000);
