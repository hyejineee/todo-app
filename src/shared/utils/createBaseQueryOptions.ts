import {
  queryOptions,
  type DefaultError,
  type DefinedInitialDataOptions,
  type QueryKey,
} from '@tanstack/react-query';

export const createBaseQueryOptions = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: { queryKey: TQueryKey } & Partial<
    Omit<
      DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
      'staleTime' | 'gcTime'
    >
  >,
) => {
  return queryOptions({
    ...options,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 15, // 15분
  });
};
