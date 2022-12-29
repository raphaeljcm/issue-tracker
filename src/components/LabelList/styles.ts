import styled from 'styled-components';

export const LabelsContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  button {
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 999px;
    padding: 0.1rem 0.3rem;
    border: solid 1px;
    text-align: center;
    white-space: nowrap;
  }
`;
