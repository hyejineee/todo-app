import {
  LoginUseCase,
  RegisterUserUseCase,
  type IAuthRepository,
  type ITokenRepository,
} from '@application/auth';
import type { ITodoRepository } from '@application/todo/repositories/todoRepository';
import CreateTodoUseCase from '@application/todo/useCases/CreateTodoUseCase';
import {
  AuthRemoteDataSource,
  TokenLocalDataSource,
} from '@infra/dataSources/auth';
import { TodoRemoteDataSource } from '@infra/dataSources/todo';
import { HttpClient } from '@infra/network';
import { AuthRepository, TokenRepository } from '@infra/repositories/auth';
import TodoRepositoryImpl from '@infra/repositories/todo/todoRepositoryImpl';
import { Container } from 'inversify';
import { DI_TYPES } from './diTypes';

const diContainer = new Container();

diContainer.bind(DI_TYPES.HttpClient).toDynamicValue((context) => {
  const tokenDataSource = context.container.get<TokenLocalDataSource>(
    DI_TYPES.TokenLocalDataSource,
  );
  return new HttpClient('http://localhost:8080', tokenDataSource);
});

// dataSource
diContainer
  .bind(DI_TYPES.AuthRemoteDataSource)
  .to(AuthRemoteDataSource)
  .inSingletonScope();
diContainer
  .bind(DI_TYPES.TokenLocalDataSource)
  .to(TokenLocalDataSource)
  .inSingletonScope();
diContainer
  .bind(DI_TYPES.TodoRemoteDataSource)
  .to(TodoRemoteDataSource)
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
diContainer
  .bind<ITodoRepository>(DI_TYPES.ITodoRepository)
  .to(TodoRepositoryImpl)
  .inSingletonScope();

// useCase
diContainer.bind(DI_TYPES.LoginUseCase).to(LoginUseCase).inSingletonScope();
diContainer
  .bind(DI_TYPES.RegisterUserUseCase)
  .to(RegisterUserUseCase)
  .inSingletonScope();
diContainer
  .bind(DI_TYPES.CreateTodoUseCase)
  .to(CreateTodoUseCase)
  .inSingletonScope();

export { diContainer };
