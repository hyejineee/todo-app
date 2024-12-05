import type {
  GetTodosUseCase,
  GetTodoUseCase,
} from '@/application/todo/useCases';
import { DI_TYPES, diContainer } from '@/shared/config';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const todoKeys = createQueryKeys('todos', {
  list: {
    queryKey: null,
    queryFn: async () => {
      return await diContainer
        .get<GetTodosUseCase>(DI_TYPES.GetTodosUseCase)
        .execute();
    },
  },
  detail: (params: { id: string }) => ({
    queryKey: [params.id],
    queryFn: async () => {
      return await diContainer
        .get<GetTodoUseCase>(DI_TYPES.GetTodoUseCase)
        .execute(params.id);
    },
  }),
});
