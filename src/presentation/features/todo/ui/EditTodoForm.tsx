import { Todo } from '@/domain/todo';
import { TodoForm, type TodoFormVOType } from '@/presentation/entities/todo/ui';
import { Column } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { useUpdateTodo } from '../api';

type EditTodoFormProps = {
  todo: Todo;
};
export const EditTodoForm = (props: EditTodoFormProps) => {
  const { todo } = props;
  const navigate = useNavigate();
  const { mutateAsync: deleteTodoRequest } = useUpdateTodo();

  const editTodo = async (formValue: TodoFormVOType) => {
    try {
      const edited = new Todo({
        ...todo,
        ...formValue,
      });

      await deleteTodoRequest(edited);

      navigate(`/todos/${todo.getId()}`, { replace: true });
    } catch (e) {
      // TODO 에러처리하기
      console.log(e);
    }
  };
  return (
    <TodoForm
      defaultValue={{
        title: todo.getTitle().getValue(),
        status: todo.getStatus().getValue(),
        priority: todo.getPriority().getValue(),
        content: todo.getContent().getValue(),
      }}
    >
      <Column css={{ gap: 24 }}>
        <TodoForm.TitleField />
        <TodoForm.PriorityField />
        <TodoForm.StatusField />
        <TodoForm.ContentField />

        <TodoForm.Submit onSubmit={editTodo}>EDIT</TodoForm.Submit>
      </Column>
    </TodoForm>
  );
};
