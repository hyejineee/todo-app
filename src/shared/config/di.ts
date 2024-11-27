import {
  LoginUseCase,
  RegisterUserUseCase,
  type IAuthRepository,
  type ITokenRepository,
} from '@application/auth';
import { AuthRemoteDataSource, TokenLocalDataSource } from '@infra/dataSources';
import { HttpClient } from '@infra/network';
import { AuthRepository, TokenRepository } from '@infra/repositories';
import { Container } from 'inversify';
import { DI_TYPES } from './diTypes';

const diContainer = new Container();

diContainer
  .bind(DI_TYPES.HttpClient)
  .toConstantValue(new HttpClient('http://localhost:4000'));

// dataSource
diContainer
  .bind(DI_TYPES.AuthRemoteDataSource)
  .to(AuthRemoteDataSource)
  .inSingletonScope();
diContainer
  .bind(DI_TYPES.TokenLocalDataSource)
  .to(TokenLocalDataSource)
  .inSingletonScope();

// repository
diContainer
  .bind<IAuthRepository>(DI_TYPES.IAuthRepository)
  .to(AuthRepository)
  .inSingletonScope();
diContainer
  .bind<ITokenRepository>(DI_TYPES.ITokenRepository)
  .to(TokenRepository)
  .inSingletonScope();

// useCase
diContainer.bind(DI_TYPES.LoginUseCase).to(LoginUseCase).inRequestScope();
diContainer
  .bind(DI_TYPES.RegisterUserUseCase)
  .to(RegisterUserUseCase)
  .inSingletonScope();

export { diContainer };
