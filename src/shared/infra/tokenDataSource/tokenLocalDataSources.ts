import { AuthToken } from './AuthToken';
import type { TokenDataSource } from './tokenDataSource';

export class TokenLocalDataSource implements TokenDataSource {
  static TOKEN_KEY = 'token';

  getToken(): AuthToken | null {
    const token = localStorage.getItem(TokenLocalDataSource.TOKEN_KEY);
    if (!token) return null;

    const authToken = AuthToken.create(token);

    if (authToken.isSuccess && authToken.value) {
      return authToken.value;
    }

    return null;
  }

  saveToken(token: AuthToken) {
    localStorage.setItem(TokenLocalDataSource.TOKEN_KEY, token.value);
  }

  removeToken() {
    localStorage.removeItem(TokenLocalDataSource.TOKEN_KEY);
  }
}
