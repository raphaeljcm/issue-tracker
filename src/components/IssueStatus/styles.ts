import styled from 'styled-components';

export const IssueStatusContainer = styled.div`
  border-bottom: solid 1px #aaa;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }

  span {
    font-size: 0.9rem;
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  > div > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
