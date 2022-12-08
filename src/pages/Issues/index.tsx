import { IssuesList } from '../../components/IssuesList';
import { LabelList } from '../../components/LabelList';
import * as S from './styles';

export function Issues() {
  return (
    <div>
      <S.MainContainer>
        <S.SectionContainer>
          <h1>Issues</h1>
          <IssuesList />
        </S.SectionContainer>
        <S.AsideContainer>
          <LabelList />
        </S.AsideContainer>
      </S.MainContainer>
    </div>
  );
}
