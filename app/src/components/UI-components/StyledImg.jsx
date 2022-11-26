import styled, { css } from 'styled-components';

const Img = styled.img`
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

export default Img;
