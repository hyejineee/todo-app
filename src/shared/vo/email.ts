import type { Result, ValidationError } from '@shared';

export class Email {
  static readonly ERROR = {
    INVALID_DOMAIN: {
      code: 'EMAIL.INVALID_DOMAIN',
      msg: '회사 이메일만 사용 가능합니다.',
    },
  };

  private constructor(private readonly value: string) {}
  public static create(email: string): Result<Email> {
    const errors = Email.validationBusinessRules(email);

    if (errors.length > 0) return { isSuccess: false, errors };
    return { isSuccess: true, value: new Email(email) };
  }

  public static validationBusinessRules(email: string) {
    const errors: ValidationError[] = [];

    if (!email.endsWith('@smiledragon.co.kr')) {
      errors.push({
        ...Email.ERROR.INVALID_DOMAIN,
        path: 'email',
      });
    }

    return errors;
  }

  public getValue(): string {
    return this.value;
  }
}
