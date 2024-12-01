import type { Result } from '@shared/types';
import { z } from 'zod';

export class Password {
  static readonly schema = z
    .string()
    .min(8, '8자 이상 입력해 주세요.')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.',
    );
  private constructor(private readonly value: string) {}

  public static create(password: string): Result<Password> {
    const result = Password.schema.safeParse(password);

    if (!result.success) {
      return {
        isSuccess: false,
        errors: result.error.errors.map(({ code, message }) => ({
          code,
          msg: message,
          path: 'password',
        })),
      };
    }

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
