import type { DeleteTodoUseCase } from '@/application/todo/useCases';
import { todoKeys } from '@/presentation/entities/todo/api';
import { DI_TYPES, diContainer } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await diContainer
        .get<DeleteTodoUseCase>(DI_TYPES.DeleteTodoUseCase)
        .execute(id);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(todoKeys.list);
      queryClient.invalidateQueries(todoKeys.detail({ id: variables }));
    },
  });
};
