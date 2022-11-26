import styled, { css } from 'styled-components';

export const StyledH1 = styled.h1`
  font-family: 'Poppins';
  color: white;
  font-size: 2rem;

  ${(props) => {
    const { textalign } = props;
    return css`
      text-align: ${textalign};
    `;
  }}
`;

export const H1 = ({ props, text }) => {
  return <StyledH1 {...props}>{text}</StyledH1>;
};
