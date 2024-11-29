import type { Result } from '@shared/types';
import { z } from 'zod';

export default class Status {
  private constructor(private readonly value: string) {}

  static schema = z.enum(['done', 'notStarted', 'inProgress']);

  static readonly NOT_STARTED = new Status('notStarted');
  static readonly IN_PROGRESS = new Status('inProgress');
  static readonly DONE = new Status('done');

  static create(value: string): Result<Status> {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      return {
        isSuccess: false,
        errors: result.error.errors.map(({ code, message }) => ({
          code,
          msg: message,
          path: 'status',
        })),
      };
    }

    let status: Status;
    switch (result.data) {
      case 'notStarted': {
        status = Status.NOT_STARTED;
        break;
      }
      case 'inProgress': {
        status = Status.IN_PROGRESS;
        break;
      }
      case 'done': {
        status = Status.DONE;
        break;
      }
      default:
        return {
          isSuccess: false,
          errors: [
            {
              code: 'invalid_status',
              msg: `Invalid status value: ${value}`,
              path: 'status',
            },
          ],
        };
    }

    return {
      isSuccess: true,
      value: status,
    };
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: Status): boolean {
    return this.value === other.value;
  }
}
