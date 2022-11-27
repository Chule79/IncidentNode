import styled, { css } from 'styled-components';


const H2 = styled.h2`
  font-size: 1.3rem;

  ${(props) => {
    const { textalign, borderradius } = props;
    return css`
      text-align: ${textalign};
      border-radius: ${borderradius};
    `;
  }}
`;


export default H2;

