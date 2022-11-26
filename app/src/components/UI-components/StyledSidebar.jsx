import styled from 'styled-components';

import theme from '../../theme';

const SidebarStyle = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 13rem;
  background-color: ${theme.light.background};
  display: flex;
  flex-direction: column;
  flex: 0 1 4rem;
  justify-content: start;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;

export default SidebarStyle;
