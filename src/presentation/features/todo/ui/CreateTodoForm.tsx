import { TodoForm, type TodoFormVOType } from '@/presentation/entities/todo/ui';
import { Todo } from '@domain/todo';
import { useCreateTodo } from '../api';

export const CreateTodoForm = () => {
  const { mutateAsync: createTodoRequest } = useCreateTodo();
  const createTodo = async (formValue: TodoFormVOType) => {
    try {
      const todo = new Todo({
        ...formValue,
      });
      await createTodoRequest(todo);
    } catch (e) {
      // TODO: 에러 처리 해야댓
      alert(e);
    }
  };

  return <TodoForm onSubmit={createTodo} buttonText="Create" />;
};
