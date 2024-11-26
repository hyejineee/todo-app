import { injectable } from 'inversify';

@injectable()
export class TokenLocalDataSource {
  static TOKEN_KEY = 'token';

  getToken(): string | null {
    const token = localStorage.getItem(TokenLocalDataSource.TOKEN_KEY);
    if (!token) return null;

    return token;
  }

  saveToken(token: string) {
    localStorage.setItem(TokenLocalDataSource.TOKEN_KEY, token);
  }

  removeToken() {
    localStorage.removeItem(TokenLocalDataSource.TOKEN_KEY);
  }
}
