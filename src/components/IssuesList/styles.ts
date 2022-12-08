import styled from 'styled-components';

export const IssuesListContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border: solid 1px rgba(255, 255, 255, 0.25);
    border-radius: 0.25rem;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    div svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    a {
      text-decoration: none;
      margin-right: 1rem;
    }

    small {
      font-size: 0.75rem;
      color: #aaa;
    }
  }
`;
