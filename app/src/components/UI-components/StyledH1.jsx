import styled, { css } from 'styled-components';


const H1 = styled.h1`

  font-family: 'Poppins';
  color: white;
  font-size: 2rem;

  ${(props) => {
    const { textalign } = props;
    return css`
      text-align: ${textalign};
    `;
  }}
`;


export default H1;

