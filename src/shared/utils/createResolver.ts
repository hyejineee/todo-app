import type { Resolver } from 'react-hook-form';
import {
  isFailResult,
  isSuccessResult,
  type FailResult,
  type Result,
  type SuccessResult,
} from '../types';

export type ValueObjectClass<Input, T> = {
  create: (value: Input) => Result<T>;
};

type ResolverInput<T> = {
  [K in keyof T]: ValueObjectClass<any, T[K]>;
};

const isFailResultEntry = (
  entry: [string, Result<any>],
): entry is [string, FailResult] => {
  return isFailResult(entry[1]);
};
const isSuccessResultEntry = <T, K extends keyof T>(
  entry: [string, Result<T[K]>],
): entry is [string, SuccessResult<T[K]>] => {
  return isSuccessResult(entry[1]);
};

export const createResolver = <T extends Record<string, any>>(
  valueObjects: ResolverInput<T>,
): Resolver<T> => {
  return (values) => {
    const results = Object.entries(values).reduce(
      (acc, [key, value]) => {
        const ValueObject = valueObjects[key as keyof typeof valueObjects];
        return {
          ...acc,
          [key]: ValueObject.create(value),
        };
      },
      {} as Record<keyof T, Result<T[keyof T]>>,
    );

    const errors = Object.entries(results)
      .filter(isFailResultEntry)
      .reduce(
        (acc, [key, result]) => ({
          ...acc,
          [key]: {
            type: 'validation',
            message: result.errors[0]?.msg || '유효하지 않은 값입니다.',
          },
        }),
        {},
      );

    if (Object.keys(errors).length > 0) {
      return {
        values: {},
        errors,
      };
    }

    const successes = Object.entries(results)
      .filter(isSuccessResultEntry)
      .reduce(
        (acc, [key, result]) => ({
          ...acc,
          [key]: result.value,
        }),
        {} as T,
      );

    // 모든 검증이 성공한 경우
    return {
      values: successes,
      errors: {},
    };
  };
};
