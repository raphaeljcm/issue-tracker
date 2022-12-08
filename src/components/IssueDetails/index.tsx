import { useParams } from 'react-router-dom';

export function IssueDetails() {
  const { number } = useParams();

  return <h1>Issue {number}</h1>;
}
