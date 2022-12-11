import styled from 'styled-components';

export const IssueDetailsContainer = styled.div`
  main {
    display: flex;
    gap: 4rem;
  }
  section {
    flex: 2;
  }
  aside {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  aside img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 999px;
  }

  aside > div {
    position: relative;
  }

  aside svg {
    cursor: pointer;
    transition: transform 0.25s ease-in-out;

    &:hover {
      transform: rotate(30deg);
    }
  }
`;
