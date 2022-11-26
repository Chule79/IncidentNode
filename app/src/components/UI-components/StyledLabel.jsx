import styled, { css } from 'styled-components';

const Label = styled.label`
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

export default Label;
