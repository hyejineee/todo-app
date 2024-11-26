const DI_TYPES = {
  HttpClient: Symbol.for('HttpClient'),

  // dataSources
  AuthRemoteDataSource: Symbol.for('AuthRemoteDataSource'),
  TokenLocalDataSource: Symbol.for('TokenLocalDataSource'),

  // repositories
  IAuthRepository: Symbol.for('IAuthRepository'),
  ITokenRepository: Symbol.for('ITokenRepository'),

  // useCases
  LoginUseCase: Symbol.for('LoginUseCase'),
  RegisterUserUseCase: Symbol.for('RegisterUserUseCase'),
};

export { DI_TYPES };
