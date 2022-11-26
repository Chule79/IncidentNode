import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  box-sizing: border-box;

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
    `;
  }}
`;

export const Div = (props) => {
  return <StyledDiv {...props}></StyledDiv>;
};
