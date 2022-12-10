import styled from 'styled-components';

export const ButtonStyled = styled.button`
  width: 100%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.yellow};
  color: ${({ theme }) => theme.black};
  border-radius: 0.25rem;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  transition: background-color 0.1s ease-in-out;
  text-align: center;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 999px;
  padding: 0.1rem 0.3rem;
  border: solid 1px;
  text-align: center;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.gold};
  }
`;
