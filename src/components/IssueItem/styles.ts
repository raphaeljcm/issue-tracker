import styled from 'styled-components';

export const IssueContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > span > span {
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 999px;
    padding: 0.1rem 0.3rem;
    border: solid 1px;
    text-align: center;
    white-space: nowrap;
  }
`;

export const CommentCount = styled.span`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0.25rem;
  color: #aaa;
  font-size: 0.9rem;
`;

export const AssignedTo = styled.img`
  width: 1.5rem;
  border-radius: 100%;
`;
