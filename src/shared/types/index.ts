type FailResult = {
  isSuccess: false;
  errors: ValidationError[];
};
type SuccessResult<T> = {
  isSuccess: true;
  value: T;
};

export type Result<T> = FailResult | SuccessResult<T>;

export interface ValidationError {
  code: string;
  msg: string;
  path?: string;
}
