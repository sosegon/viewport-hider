import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Box } from 'rebass';
import styled from 'styled-components';
import { MdOutlineToggleOff, MdOutlineToggleOn } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { saveParam, getParam } from 'Common/persistance';

function Popup() {
  const [on, setOn] = useState(true);
  const toggle = useCallback(() => {
    setOn(!on);
    saveParam('on', !on);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: 'toggle', value: !on });
    });
  }, [on, setOn]);

  useEffect(() => {
    getParam('on', res => {
      const savedOn = res['on'] ?? on;
      if (savedOn !== on) {
        setOn(savedOn);
      }
    });
  }, []);

  return (
    <Box>
      <IconContext.Provider
        value={{ color: on ? 'black' : 'gray', className: 'global-class-name' }}
      >
        <Wrapper onClick={toggle}>
          {on ? (
            <MdOutlineToggleOn size={'40px'} />
          ) : (
            <MdOutlineToggleOff size={'40px'} />
          )}
        </Wrapper>
      </IconContext.Provider>
    </Box>
  );
}

export const Wrapper = styled(Box).attrs(({ sx }) => ({
  sx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 9999,
    ...sx,
  },
}))``;

const root = document.createElement('root-popup');

document.body.append(root);

ReactDOM.render(<Popup />, document.getElementById('root-popup'));
