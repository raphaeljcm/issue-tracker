import styled from 'styled-components';

export const IssueHeaderContainer = styled.header`
  border-bottom: solid 1px #aaa;
  padding-bottom: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #aaa;
    font-size: 0.9rem;

    span:last-of-type {
      font-weight: bold;
    }
  }

  h2 span {
    color: #aaa;
  }
`;

interface StatusSpanProps {
  status: 'open' | 'closed';
}

export const StatusSpan = styled.span<StatusSpanProps>`
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 1rem;
  background-color: ${({ status }) => (status === 'open' ? 'green' : 'red')};
`;
