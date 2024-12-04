import type { GetTodosUseCase } from '@/application/todo/useCases';
import { DI_TYPES, diContainer } from '@/shared/config';
import { createBaseQueryOptions } from '@/shared/utils';

export const todoKeys = {
  all: ['todos'] as const,
  list: () => [...todoKeys.all] as const,
  detail: (id: string) => [...todoKeys.all, 'detail', id] as const,
} as const;

export const createGetTodosQueryOptions = () => {
  return createBaseQueryOptions({
    queryKey: todoKeys.list(),
    queryFn: async () => {
      return await diContainer
        .get<GetTodosUseCase>(DI_TYPES.GetTodosUseCase)
        .execute();
    },
  });
};
