import React, { forwardRef } from 'react';
import { Box } from 'rebass';

const Pane = forwardRef((props, ref) => {
  const { sx } = props;
  return <Box sx={sx} ref={ref}></Box>;
});

Pane.displayName = 'Pane';

export default Pane;
