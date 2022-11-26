import styled, { css } from 'styled-components';

export const StyleAnchor = styled.a`
  
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

export const Anchor = ({ props, text }) => {
  return <StyleAnchor {...props}>{text}</StyleAnchor>;
};
