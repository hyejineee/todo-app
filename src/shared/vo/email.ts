import type { Result } from '@shared';

export class Email {
  private constructor(private readonly value: string) {}

  public static create(email: string): Result<Email> {
    if (!email || !email.includes('@')) {
      return { isSuccess: false, error: '유효하지 않은 이메일입니다.' };
    }
    return { isSuccess: true, value: new Email(email) };
  }

  public getValue(): string {
    return this.value;
  }
}
