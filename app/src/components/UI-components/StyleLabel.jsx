import styled, { css } from 'styled-components';

export const StyledLabel = styled.label`
  
  ${(props) => {
    const { textalign, borderradius, fontcolor, fontsize } = props;
    return css`
      color: ${fontcolor};
      text-align: ${textalign};
      border-radius: ${borderradius};
      font-size: ${fontsize};
    `;
  }}
`;

export const Label = ({ props, text }) => {
  return <StyledLabel {...props}>{text}</StyledLabel>;
};