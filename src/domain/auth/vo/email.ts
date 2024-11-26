import type { Result } from '@shared';
import { z } from 'zod';

export class Email {
  private constructor(private readonly value: string) {}

  static readonly schema = z.string().email('유효하지 않은 이메일 형식입니다.');

  public static create(email: string): Result<Email> {
    const result = Email.schema.safeParse(email);

    if (!result.success) {
      return {
        isSuccess: false,
        errors: result.error.errors.map(({ code, message, path }) => ({
          code,
          msg: message,
          path: path[0] as string,
        })),
      };
    }
    return { isSuccess: true, value: new Email(result.data) };
  }

  public getValue(): string {
    return this.value;
  }
}
