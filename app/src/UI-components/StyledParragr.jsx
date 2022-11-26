import styled, { css } from 'styled-components';

export const StyledP = styled.p`
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

export const P = ({ props, text }) => {
  return <StyledP {...props}>{text}</StyledP>;
};
