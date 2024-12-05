export type FailResult = {
  isSuccess: false;
  errors: ValidationError[];
};
export type SuccessResult<T> = {
  isSuccess: true;
  value: T;
};

export type Result<T> = FailResult | SuccessResult<T>;

export interface ValidationError {
  code: string;
  msg: string;
  path?: string;
}

export type PrimitiveType = string | number | boolean | symbol | bigint;

export function isFailResult(
  result: FailResult | SuccessResult<any>,
): result is FailResult {
  return result.isSuccess === false;
}

export function isSuccessResult<T>(
  result: FailResult | SuccessResult<T>,
): result is SuccessResult<T> {
  return result.isSuccess === true;
}

export interface VO<Primitive, ValueType> {
  getValue(): Primitive;
  toString(): string;
  equals(other: ValueType): boolean;
}
