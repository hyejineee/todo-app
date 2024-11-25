import type { IAuthRepository } from '@application/auth';
import { Token, type Email, type Password } from '@domain/auth';
import type { AuthRemoteDataSource } from '@infra/dataSources';

export class AuthRepository implements IAuthRepository {
  constructor(private authDataSource: AuthRemoteDataSource) {}

  async login(params: { email: Email; password: Password }): Promise<Token> {
    try {
      const result = await this.authDataSource.login({
        email: params.email.getValue(),
        password: params.password.getValue(),
      });

      const authToken = Token.create(result.token);
      if (!authToken.isSuccess) throw authToken.errors;

      return authToken.value;
    } catch (e) {
      // TODO : API에서 에러가 발생한 경우 도메인 에러로 변환시켜줘야 함.
      throw e;
    }
  }

  async register(params: { email: Email; password: Password }): Promise<Token> {
    try {
      const result = await this.authDataSource.register({
        email: params.email.getValue(),
        password: params.password.getValue(),
      });

      const authToken = Token.create(result.token);
      if (!authToken.isSuccess) throw authToken.errors;
      return authToken.value;
    } catch (e) {
      // TODO : API에서 에러가 발생한 경우 도메인 에러로 변환시켜줘야 함.
      throw e;
    }
  }
}
