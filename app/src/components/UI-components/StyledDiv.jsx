import styled, { css } from 'styled-components';

const Div = styled.div`
  box-sizing: border-box;

  ${(props) => {
    const {
      backgr,
      fontcolor,
      fontsize,
      display,
      flexwrap,
      flexdir,
      gridcolumn,
      objectfit,
      width,
      height,
      justify,
      border,
      borderradius,
      padding,
      margin,
      margTop,
      margLeft,
      align,
      borderbottom,
      gap,
      flex,
    } = props;
    return css`
      background-color: ${backgr};
      color: ${fontcolor};
      font-size: ${fontsize};
      display: ${display};
      flex-wrap: ${flexwrap};
      flex-direction: ${flexdir};
      grid-template-columns: ${gridcolumn};
      object-fit: ${objectfit};
      width: ${width};
      height: ${height};
      justify-content: ${justify};
      border-radius: ${borderradius};
      border: ${border};
      border-radius: ${borderradius};
      padding: ${padding};
      margin: ${margin};
      margin-top: ${margTop};
      margin-left: ${margLeft};
      align-items: ${align};
      border-bottom: ${borderbottom};
      gap: ${gap};
      flex: ${flex};
    `;
  }}
`;

export default Div;
