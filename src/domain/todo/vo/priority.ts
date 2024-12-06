import type { Result, VO } from '@/shared/types';
import { z } from 'zod';

export type PriorityType = 'urgent' | 'normal' | 'row';
export default class Priority implements VO<string, Priority> {
  private constructor(private readonly value: string) {}

  static keys: Record<PriorityType, PriorityType> = {
    urgent: 'urgent',
    normal: 'normal',
    row: 'row',
  };

  static schema = z.enum([this.keys.urgent, this.keys.normal, this.keys.row]);

  static readonly URGENT = new Priority(this.keys.urgent);
  static readonly NORMAL = new Priority(this.keys.normal);
  static readonly ROW = new Priority(this.keys.row);

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
      case this.keys.urgent: {
        priority = Priority.URGENT;
        break;
      }
      case this.keys.normal: {
        priority = Priority.NORMAL;
        break;
      }
      case this.keys.row: {
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
