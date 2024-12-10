import type { EditTodoUseCase } from '@/application/todo/useCases';
import type { Todo } from '@/domain/todo';
import { todoKeys } from '@/presentation/entities/todo/api';
import { DI_TYPES, diContainer } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: Todo) => {
      await diContainer.get<EditTodoUseCase>(DI_TYPES.EditTodoUseCase).execute({
        id: todo.getId(),
        todo,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(todoKeys.list());
      queryClient.invalidateQueries(todoKeys.detail({ id: variables.getId() }));
    },
  });
};
