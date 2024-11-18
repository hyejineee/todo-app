import type { AuthToken, ITokenRepository, TokenDataSource } from '../model';

export class TokenRepository implements ITokenRepository {
  constructor(private tokenDataSource: TokenDataSource) {}

  save(token: AuthToken): void {
    this.tokenDataSource.saveToken(token.value);
  }
  remove(): void {
    this.tokenDataSource.removeToken();
  }
  get(): AuthToken | null {
    return this.tokenDataSource.getToken();
  }
}
