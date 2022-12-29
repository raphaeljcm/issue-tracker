import styled from 'styled-components';

export const ButtonStyled = styled.button`
  width: 100%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.yellow};
  color: ${({ theme }) => theme.black};
  transition: background-color 0.1s ease-in-out;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.gold};
  }
`;
