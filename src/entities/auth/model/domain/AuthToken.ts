export class AuthToken {
  private constructor(
    private readonly _token: string,
    private readonly expiresAt: Date,
  ) {}

  public static create(token: string): AuthToken {
    // TODO : 토큰 파싱해서 만료 시간 구하기
    return new AuthToken(token, new Date());
  }

  public get value(): string {
    return this._token;
  }

  public isExpired(): boolean {
    return new Date() >= this.expiresAt;
  }
}
