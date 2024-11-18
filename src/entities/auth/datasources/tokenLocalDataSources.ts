import { type TokenDataSource, AuthToken } from '../model';

export class TokenLocalDataSource implements TokenDataSource {
  static TOKEN_KEY = 'token';

  getToken(): AuthToken | null {
    const token = localStorage.getItem(TokenLocalDataSource.TOKEN_KEY);
    if (!token) return null;

    const authToken = AuthToken.create(token);

    return authToken;
  }

  saveToken(token: string) {
    localStorage.setItem(TokenLocalDataSource.TOKEN_KEY, token);
  }

  removeToken() {
    localStorage.removeItem(TokenLocalDataSource.TOKEN_KEY);
  }
}
