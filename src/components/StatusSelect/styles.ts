import styled from 'styled-components';

export const StyledStatusSelect = styled.select`
  background-color: black;
  color: ${({ theme }) => theme.yellow};
  border: solid 1px ${({ theme }) => theme.yellow};
  font-size: 1rem;
  text-align: center;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: bold;
  cursor: pointer;
`;
