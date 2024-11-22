import { jwtDecode } from 'shared/lib';
import type { Result } from 'shared/types';

export class Token {
  private constructor(
    private readonly value: string,
    private readonly expiresAt: Date,
  ) {}

  public static create(token: string): Result<Token> {
    const result = jwtDecode<{ exp: number }>(token);
    return { isSuccess: true, value: new Token(token, new Date(result.exp)) };
  }

  getValue() {
    return this.value;
  }

  public isExpired(): boolean {
    return new Date() >= this.expiresAt;
  }
}
