import type { Result, VO } from '@shared/types';
import { z } from 'zod';

export default class Title implements VO<string, Title> {
  private constructor(private readonly value: string) {}
  public static schema = z
    .string()
    .min(1, '제목은 필수 입니다.')
    .max(20, '20자 이하로 작성해 주세요.');

  static create(value: string): Result<Title> {
    const result = Title.schema.safeParse(value);

    if (!result.success) {
      return {
        isSuccess: false,
        errors: result.error.errors.map(({ code, message }) => ({
          code,
          msg: message,
          path: 'title',
        })),
      };
    }

    return { isSuccess: true, value: new Title(result.data) };
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Title): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
