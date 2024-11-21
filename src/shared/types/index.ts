export type DataSourceReturnType<
  Remote extends boolean,
  Return,
> = Remote extends true ? Promise<Return> : Return;

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
