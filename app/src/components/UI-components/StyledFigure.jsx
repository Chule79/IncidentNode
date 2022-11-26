import styled, { css } from 'styled-components';

export const StyledFigure = styled.figure`
  display: flex;

  ${(props) => {
    const {
      backgr,
      fontcolor,
      fontsize,
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
      placeit,
    } = props;
    return css`
      background-color: ${backgr};
      color: ${fontcolor};
      font-size: ${fontsize};
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
      place-items: ${placeit};
    `;
  }}
`;

export const Figure = (props) => {
  return <StyledFigure {...props}></StyledFigure>;
};
