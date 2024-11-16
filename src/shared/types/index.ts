export type DataSourceReturnType<
  Remote extends boolean,
  Return,
> = Remote extends true ? Promise<Return> : Return;

export type Result<T> = {
  isSuccess: boolean;
  error?: string;
  value?: T;
};
