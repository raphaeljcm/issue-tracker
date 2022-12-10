import { ButtonHTMLAttributes, ReactNode } from 'react';

import * as S from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return <S.ButtonStyled {...rest}>{children}</S.ButtonStyled>;
}
