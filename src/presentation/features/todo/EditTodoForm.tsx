import { Todo } from '@/domain/todo';
import { TodoForm } from '@/presentation/entities/todo/ui';

type EditTodoFormProps = {
  todo: Todo;
};
export const EditTodoForm = (props: EditTodoFormProps) => {
  const { todo } = props;

  return (
    <TodoForm
      onSubmit={() => {}}
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
