import styled from 'styled-components';

export const AddIssueContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 65ch;

    input,
    textarea {
      width: 100%;
      padding: 0.5rem;
      color: white;
      border: solid 1px #aaa;
      background-color: var(--black);
      border-radius: 0.25rem;
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-family: proxima-nova, -apple-system, BlinkMacSystemFont, Segoe UI,
        Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
    }

    textarea {
      height: 10rem;
      resize: vertical;
    }

    button {
      width: max-content;
      align-self: flex-end;
      font-size: 1rem;
    }

    label {
      margin-bottom: 0.25rem;
      display: block;
      font-weight: bold;
    }
  }
`;
