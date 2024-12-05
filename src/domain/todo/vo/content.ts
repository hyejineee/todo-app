import type { Result, VO } from '@/shared/types';
import { z } from 'zod';

export default class Content implements VO<string, Content> {
  private constructor(private readonly value: string) {}
  public static schema = z
    .string()
    .min(1, '내용은 필수 입니다.')
    .max(100, '100자 이하로 작성해 주세요.');

  static create(value: string): Result<Content> {
    const result = Content.schema.safeParse(value);

    if (!result.success) {
      return {
        isSuccess: false,
        errors: result.error.errors.map(({ code, message }) => ({
          code,
          msg: message,
          path: 'content',
        })),
      };
    }

    return { isSuccess: true, value: new Content(result.data) };
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Content): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
