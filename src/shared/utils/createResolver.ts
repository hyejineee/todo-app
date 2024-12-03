import type { Resolver } from 'react-hook-form';
import {
  isFailResult,
  isSuccessResult,
  type FailResult,
  type Result,
  type SuccessResult,
} from '../types';

type ValueObjectClass<Input, T> = {
  create: (value: Input) => Result<T>;
};
type FormValue<T> = {
  [K in keyof T]: string;
};
type ResolverInput = {
  [key: string]: ValueObjectClass<any, any>;
};

const isFailResultEntry = (
  entry: [string, Result<any>],
): entry is [string, FailResult] => {
  return isFailResult(entry[1]);
};
const isSuccessResultEntry = (
  entry: [string, Result<any>],
): entry is [string, SuccessResult<any>] => {
  return isSuccessResult(entry[1]);
};

export const createResolver = <T extends ResolverInput>(
  valueObjects: T,
): Resolver<FormValue<T>> => {
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
        {} as FormValue<T>,
      );

    // 모든 검증이 성공한 경우
    return {
      values: successes,
      errors: {},
    };
  };
};
