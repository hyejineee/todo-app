import type { ITokenRepository } from '@application/auth';
import { Token } from '@domain/auth';
import type { TokenLocalDataSource } from '@infra/dataSources';

export class TokenRepository implements ITokenRepository {
  constructor(private tokenDataSource: TokenLocalDataSource) {}

  save(token: Token): void {
    this.tokenDataSource.saveToken(token.getValue());
  }
  remove(): void {
    this.tokenDataSource.removeToken();
  }
  get(): Token | null {
    const result = this.tokenDataSource.getToken();

    if (!result) return null;

    try {
      const token = Token.create(result);
      if (!token.isSuccess) throw token.errors;

      return token.value;
    } catch (e) {
      // TODO : 도메인 에러로 변환해서 처리하기
      throw e;
    }
  }
}
