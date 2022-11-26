import styled from 'styled-components';

export const StyledAnchor = styled.a`
  font-family: 'Poppins';
  color: crimson;
  font-size: 1.3rem;
  place-self: center;
  :hover {
    transform: scale(1.1);
  }
`;

export const Anchor = ({ text }) => {
  return <StyledAnchor>{text}</StyledAnchor>;
};
