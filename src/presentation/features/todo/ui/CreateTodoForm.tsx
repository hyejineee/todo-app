import { TodoForm, type TodoFormVOType } from '@/presentation/entities/todo/ui';
import { Todo } from '@domain/todo';
import { useNavigate } from 'react-router-dom';
import { useCreateTodo } from '../api';

export const CreateTodoForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: createTodoRequest } = useCreateTodo();
  const createTodo = async (formValue: TodoFormVOType) => {
    try {
      const todo = new Todo({
        ...formValue,
      });
      const created = await createTodoRequest(todo);
      navigate(`/todos/${created.getId()}`, { replace: true });
    } catch (e) {
      // TODO: 에러 처리 해야댓
      alert(e);
    }
  };

  return <TodoForm onSubmit={createTodo} buttonText="Create" />;
};
