import React, { forwardRef } from 'react';
import { Box } from 'rebass';

const Pane = forwardRef((props, ref) => {
  const { sx } = props;
  console.log('22');
  return <Box sx={sx} ref={ref}></Box>;
});

Pane.displayName = 'Pane';

export default Pane;
