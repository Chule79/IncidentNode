import styled, { css } from 'styled-components';

const Anchor = styled.a`
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

export default Anchor;
