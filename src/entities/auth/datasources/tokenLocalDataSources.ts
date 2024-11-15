import type { TokenDataSource } from "../model";

export class TokenLocalDataSource implements TokenDataSource {
  static TOKEN_KEY = "token";
  saveToken(token: string) {
    localStorage.setItem(TokenLocalDataSource.TOKEN_KEY, token);
  }

  removeToken() {
    localStorage.removeItem(TokenLocalDataSource.TOKEN_KEY);
  }
}
