import { Todo } from '@/domain/todo';
import { TodoForm, type TodoFormVOType } from '@/presentation/entities/todo/ui';
import { useNavigate } from 'react-router-dom';
import { useEditTodo } from '../api';

type EditTodoFormProps = {
  todo: Todo;
};
export const EditTodoForm = (props: EditTodoFormProps) => {
  const { todo } = props;
  const navigate = useNavigate();
  const { mutateAsync: deleteTodoRequest } = useEditTodo();

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
      onSubmit={editTodo}
      buttonText="EDIT"
      defaultValue={{
        title: todo.getTitle().getValue(),
        status: todo.getStatus().getValue(),
        priority: todo.getPriority().getValue(),
        content: todo.getContent().getValue(),
      }}
    />
  );
};