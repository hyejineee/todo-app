const DI_TYPES = {
  HttpClient: Symbol.for('HttpClient'),

  // dataSources
  AuthRemoteDataSource: Symbol.for('AuthRemoteDataSource'),
  TokenLocalDataSource: Symbol.for('TokenLocalDataSource'),
  TodoRemoteDataSource: Symbol.for('TodoRemoteDataSource'),

  // repositories
  IAuthRepository: Symbol.for('IAuthRepository'),
  ITokenRepository: Symbol.for('ITokenRepository'),
  ITodoRepository: Symbol.for('ITodoRepository'),

  // useCases
  LoginUseCase: Symbol.for('LoginUseCase'),
  RegisterUserUseCase: Symbol.for('RegisterUserUseCase'),
  CreateTodoUseCase: Symbol.for('CreateTodoUseCase'),
  GetTodosUseCase: Symbol.for('GetTodosUseCase'),
  GetTodoUseCase: Symbol.for('GetTodoUseCase'),
  DeleteTodoUseCase: Symbol.for('DeleteTodoUseCase'),
  EditTodoUseCase: Symbol.for('EditTodoUseCase'),
};

export { DI_TYPES };
