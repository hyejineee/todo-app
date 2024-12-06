import type { Result, VO } from '@shared/types';
import { z } from 'zod';

export type StatusType = 'done' | 'notStarted' | 'inProgress';
export default class Status implements VO<string, Status> {
  private constructor(private readonly value: string) {}

  static keys: Record<StatusType, StatusType> = {
    done: 'done',
    notStarted: 'notStarted',
    inProgress: 'inProgress',
  };
  static schema = z.enum([
    this.keys.done,
    this.keys.inProgress,
    this.keys.notStarted,
  ]);

  static readonly NOT_STARTED = new Status(this.keys.notStarted);
  static readonly IN_PROGRESS = new Status(this.keys.inProgress);
  static readonly DONE = new Status(this.keys.done);

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
      case this.keys.notStarted: {
        status = Status.NOT_STARTED;
        break;
      }
      case this.keys.inProgress: {
        status = Status.IN_PROGRESS;
        break;
      }
      case this.keys.done: {
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
