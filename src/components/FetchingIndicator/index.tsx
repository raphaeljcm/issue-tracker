import { useIsFetching } from '@tanstack/react-query';

import { Loader } from '../Loader';
import * as S from './styles';

export function FetchingIndicator() {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <S.FetchingIndicatorContainer>
      <Loader />
    </S.FetchingIndicatorContainer>
  );
}
