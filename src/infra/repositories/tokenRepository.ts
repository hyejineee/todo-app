import type { ITokenRepository } from '@application/auth';
import { Token } from '@domain/auth';
import type { TokenLocalDataSource } from '@infra/dataSources';
import { DI_TYPES } from '@shared';
import { inject, injectable } from 'inversify';

@injectable()
export class TokenRepository implements ITokenRepository {
  private tokenDataSource: TokenLocalDataSource;
  constructor(
    @inject(DI_TYPES.TokenLocalDataSource)
    tokenDataSource: TokenLocalDataSource,
  ) {
    this.tokenDataSource = tokenDataSource;
  }

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
