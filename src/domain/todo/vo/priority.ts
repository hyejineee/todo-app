import type { Result, VO } from '@/shared/types';
import { z } from 'zod';

export default class Priority implements VO<string, Priority> {
  private constructor(private readonly value: string) {}

  static schema = z.enum(['urgent', 'normal', 'row']);

  static readonly URGENT = new Priority('urgent');
  static readonly NORMAL = new Priority('normal');
  static readonly ROW = new Priority('row');

  static create(value: string): Result<Priority> {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      return {
        isSuccess: false,
        errors: result.error.errors.map(({ code, message }) => ({
          code,
          msg: message,
          path: 'priority',
        })),
      };
    }

    let priority: Priority;
    switch (result.data) {
      case 'urgent': {
        priority = Priority.URGENT;
        break;
      }
      case 'normal': {
        priority = Priority.NORMAL;
        break;
      }
      case 'row': {
        priority = Priority.ROW;
        break;
      }
      default:
        return {
          isSuccess: false,
          errors: [
            {
              code: 'invalid_status',
              msg: `Invalid status value: ${value}`,
              path: 'priority',
            },
          ],
        };
    }

    return {
      isSuccess: true,
      value: priority,
    };
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: Priority): boolean {
    return this.value === other.value;
  }
}
