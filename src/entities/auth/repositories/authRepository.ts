import type { Email, Password } from '@shared';
import { AuthToken, IAuthRepository, type AuthDataSource } from '../model';

export class AuthRepository implements IAuthRepository {
  constructor(private authDataSource: AuthDataSource) {}

  async login(params: {
    email: Email;
    password: Password;
  }): Promise<AuthToken> {
    // TODO : API에서 에러가 발생한 경우 도메인 에러로 변환시켜줘야 함.
    const result = await this.authDataSource.login({
      email: params.email.getValue(),
      password: params.password.getValue(),
    });

    const authToken = AuthToken.create(result.token);

    return authToken;
  }

  async register(params: {
    email: Email;
    password: Password;
  }): Promise<AuthToken> {
    const result = await this.authDataSource.register({
      email: params.email.getValue(),
      password: params.password.getValue(),
    });

    const authToken = AuthToken.create(result.token);
    return authToken;
  }
}
