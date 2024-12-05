import { TodoForm, type TodoFormVOType } from '@/presentation/entities/todo/ui';
import { type CreateTodoUseCase } from '@application/todo/useCases';
import { Todo } from '@domain/todo';
import { DI_TYPES, diContainer } from '@shared/config';

export const CreateTodoForm = () => {
  const createTodo = async (formValue: TodoFormVOType) => {
    try {
      const todo = new Todo({
        ...formValue,
      });
      await diContainer
        .get<CreateTodoUseCase>(DI_TYPES.CreateTodoUseCase)
        .execute(todo);
    } catch (e) {
      // TODO: 에러 처리 해야댓
      alert(e);
    }
  };
  return <TodoForm onSubmit={createTodo} buttonText="Create" />;
};
