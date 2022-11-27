import styled, { css } from 'styled-components';

const Nav = styled.nav`
  display: flex;
  height: 4rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  ${(props) => {
    const { dir } = props;
    return css`
      flex-direction: ${dir};
    `;
  }};
`;

export default Nav;
