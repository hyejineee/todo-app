import type { Result } from '@shared/types';

export class Token {
  private constructor(
    private readonly value: string,
    // private readonly expiresAt: Date,
  ) {}

  public static create(token: string): Result<Token> {
    // const result = jwtDecode<{ exp: number }>(token);
    return { isSuccess: true, value: new Token(token) };
  }

  getValue() {
    return this.value;
  }

  // TODO : 추후에 제대로 된 프로젝트에서 추가
  // public isExpired(): boolean {
  //   return new Date() >= this.expiresAt;
  // }
}
