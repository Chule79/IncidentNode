import styled, { css } from 'styled-components';

const StyledP = styled.p`
  font-family: 'Poppins';
  color: crimson;
  font-size: 1.2rem;

  ${(props) => {
    const { textalign } = props;
    return css`
      text-align: ${textalign};
    `;
  }}
`;

export default StyledP;