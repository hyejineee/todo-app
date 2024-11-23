import {
  AuthRemoteDataSource,
  AuthRepository,
  TokenLocalDataSource,
  TokenRepository,
  type IAuthRepository,
  type ITokenRepository,
} from '@entities';
import { HttpClient } from '@shared';
import type { AuthDataSource, TokenDataSource } from 'entities/auth/model';
import { createContext, useContext, type ReactNode } from 'react';

// TODO : DiContainer를 context로 만들어야 하는가? 그냥 상위 파일에 선언해서 사용할 수 있는거 아닌가...? 리액트와 상관없는데...??

export const httpClient = new HttpClient('http://localhost:4000');

export const authDataSource = new AuthRemoteDataSource(httpClient);
export const tokenDataSource = new TokenLocalDataSource();

export const authRepository = new AuthRepository(authDataSource);
export const tokenRepository = new TokenRepository(tokenDataSource);

interface DiContainer {
  httpClient: HttpClient;
  repositories: {
    authRepository: IAuthRepository;
    tokenRepository: ITokenRepository;
  };

  dataSources: {
    authDataSource: AuthDataSource<true>;
    tokenDataSource: TokenDataSource;
  };
}

const DiContainerContext = createContext<DiContainer | null>(null);
export const DiContainerProvider = (props: {
  baseUrl: string;
  children: ReactNode;
}) => {
  const { children } = props;

  return (
    <DiContainerContext.Provider
      value={{
        httpClient,
        dataSources: { authDataSource, tokenDataSource },
        repositories: { authRepository, tokenRepository },
      }}
    >
      {children}
    </DiContainerContext.Provider>
  );
};

export const useDiContainer = () => {
  const context = useContext(DiContainerContext);
  if (!context)
    throw new Error(
      'useDiContainer must be used within DiContainerContext.Provider',
    );

  return context;
};
