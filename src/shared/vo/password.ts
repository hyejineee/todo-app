import type { Result } from '@shared';

export class Password {
  private constructor(private readonly value: string) {}

  public static create(password: string): Result<Password> {
    return {
      isSuccess: true,
      value: new Password(password),
    };
  }

  public getValue() {
    return this.value;
  }

  public equals(other: Password): boolean {
    return this.value === other.value;
  }
}
