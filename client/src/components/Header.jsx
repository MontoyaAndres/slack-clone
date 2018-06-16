import React from 'react';
import styled from 'styled-components';
import { Header as Head } from 'semantic-ui-react';

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

const Header = ({ channelName }) => (
  <HeaderWrapper>
    <Head textAlign="center">#{channelName}</Head>
  </HeaderWrapper>
);

export default Header;
