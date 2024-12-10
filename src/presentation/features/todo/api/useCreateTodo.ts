import type { CreateTodoUseCase } from '@/application/todo/useCases';
import type { Todo } from '@/domain/todo';
import { todoKeys } from '@/presentation/entities/todo/api';
import { DI_TYPES, diContainer } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: Todo) => {
      return await diContainer
        .get<CreateTodoUseCase>(DI_TYPES.CreateTodoUseCase)
        .execute(todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(todoKeys.list());
    },
  });
};
