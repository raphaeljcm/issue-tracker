import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';

export const Spinner = styled(FaSpinner)`
  animation: spin 1s steps(8) infinite;
  height: 1rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
