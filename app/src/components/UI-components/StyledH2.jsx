import styled, { css } from 'styled-components';

const StyledH2 = styled.h2`
  font-family: 'Poppins';
  color: white;
  font-size: 1.7rem;

  ${(props) => {
    const { textalign, borderradius } = props;
    return css`
      text-align: ${textalign};
      border-radius: ${borderradius};
    `;
  }}
`;

export default StyledH2;
