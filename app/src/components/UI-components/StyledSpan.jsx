import styled, { css } from 'styled-components';

const Span = styled.span`
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

export default Span;
