import { TodoForm, type TodoFormVOType } from '@/presentation/entities/todo/ui';
import { Column } from '@/shared/ui';
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

  return (
    <TodoForm>
      <Column css={{ gap: 24 }}>
        <TodoForm.TitleField />
        <TodoForm.PriorityField />
        <TodoForm.StatusField />
        <TodoForm.ContentField />
        <TodoForm.Submit onSubmit={createTodo}>CREATE</TodoForm.Submit>
      </Column>
    </TodoForm>
  );
};
