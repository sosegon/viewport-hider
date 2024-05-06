import styled from 'styled-components';
import { Flex } from 'rebass';

export const ControlWrapper = styled(Flex).attrs(({ sx }) => ({
  sx: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    ...sx,
  },
}))``;
