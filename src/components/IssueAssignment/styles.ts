import styled from 'styled-components';

export const IssueAssignmentContainer = styled.div`
  border-bottom: solid 1px #aaa;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

export const PickerMenu = styled.ul`
  z-index: 10;
  position: absolute;
  top: 2.5rem;
  right: 1.5rem;
  width: 12rem;
  background-color: rgba(0, 0, 0, 0.8);
  border: solid 1px rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
    gap: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: #333;
    }
  }
`;
