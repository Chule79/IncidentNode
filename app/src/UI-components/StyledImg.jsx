import styled, { css } from 'styled-components';

export const StyledImg = styled.img`
  :hover {
    transform: scale(1.2);
  }
  ${(props) => {
    const { width, height, border, borderradius, padding, objectfit, margin } = props;
    return css`
      width: ${width};
      height: ${height};
      border: ${border};
      borderradius: ${borderradius};
      padding: ${padding};
      object-fit: ${objectfit};
      margin: ${margin};
    `;
  }}
`;

export const Img = (props) => {
  return <StyledImg {...props}></StyledImg>;
};
