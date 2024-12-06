import type { TodoFilter } from '@/application/todo/types';
import type {
  GetTodosUseCase,
  GetTodoUseCase,
} from '@/application/todo/useCases';
import { DI_TYPES, diContainer } from '@/shared/config';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const todoKeys = createQueryKeys('todos', {
  list: (params?: { filter: Partial<TodoFilter> }) => ({
    queryKey: [{ filter: params?.filter }],
    queryFn: async () => {
      return await diContainer
        .get<GetTodosUseCase>(DI_TYPES.GetTodosUseCase)
        .execute(params?.filter);
    },
  }),
  detail: (params: { id: string }) => ({
    queryKey: [params.id],
    queryFn: async () => {
      return await diContainer
        .get<GetTodoUseCase>(DI_TYPES.GetTodoUseCase)
        .execute(params.id);
    },
  }),
});
