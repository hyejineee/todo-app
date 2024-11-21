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
  const { baseUrl, children } = props;
  const httpClient = new HttpClient(baseUrl);

  const authDataSource = new AuthRemoteDataSource(httpClient);
  const tokenDataSource = new TokenLocalDataSource();

  const authRepository = new AuthRepository(authDataSource);
  const tokenRepository = new TokenRepository(tokenDataSource);

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
