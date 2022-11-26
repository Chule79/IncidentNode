import styled, { css } from 'styled-components';

const StyledInput = styled.input`
  box-sizing: border-box;
  border: none;
  ${(props) => {
    const {
      backgr,
      fontcolor,
      fontsize,
      display,
      flexwrap,
      flexdir,
      objectfit,
      width,
      height,
      justify,
      border,
      borderradius,
      padding,
      margin,
      align,
      borderbottom,
      gap,
      texaling,
    } = props;
    return css`
      background-color: ${backgr};
      color: ${fontcolor};
      font-size: ${fontsize};
      display: ${display};
      flex-wrap: ${flexwrap};
      flex-direction: ${flexdir};
      object-fit: ${objectfit};
      width: ${width};
      height: ${height};
      justify-content: ${justify};
      border-radius: ${borderradius};
      border: ${border};
      padding: ${padding};
      margin: ${margin};
      align-items: ${align};
      border-bottom: ${borderbottom};
      gap: ${gap};
      text-align: ${texaling};
    `;
  }}
`;

export default StyledInput;
