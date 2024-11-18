import type { Result } from '@shared';

export class Password {
  private constructor(private readonly value: string) {}

  public static create(password: string): Result<Password> {
    // 기본 유효성 검사
    if (!password || password.length < 8) {
      return {
        isSuccess: false,
        error: '비밀번호는 최소 8자 이상이어야 합니다.',
      };
    }

    if (password.length > 100) {
      return {
        isSuccess: false,
        error: '비밀번호는 100자를 초과할 수 없습니다.',
      };
    }

    // 복잡성 검사
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      return {
        isSuccess: false,
        error:
          '비밀번호는 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
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
