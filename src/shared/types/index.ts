export type ReturnType<Remote extends boolean, Return> = Remote extends true
  ? Promise<Return>
  : Return;
