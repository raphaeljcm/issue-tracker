import { Button } from '../../components/Button';
import * as S from './styles';

export function AddIssue() {
  return (
    <S.AddIssueContainer>
      <h2>Add Issue</h2>
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" placeholder="Title" />
        <label htmlFor="comment">Title</label>
        <textarea id="comment" name="comment" placeholder="Comment"></textarea>
        <Button type="submit" disabled={false}>
          Add Issue
        </Button>
      </form>
    </S.AddIssueContainer>
  );
}
