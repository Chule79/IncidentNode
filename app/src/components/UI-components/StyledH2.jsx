import styled, { css } from 'styled-components';

export const StyledH2 = styled.h2`
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

export const H2 = ({ props, text }) => {
  return <StyledH2 {...props}>{text}</StyledH2>;
};
