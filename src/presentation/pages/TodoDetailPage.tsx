import { Column } from '@/shared/ui';
import { useParams } from 'react-router-dom';
import { useTodo } from '../entities/todo/api';
import { DeleteTodo, EditTodoForm } from '../features/todo/ui';

export const TodoDetailPage = () => {
  const params = useParams();
  const { data: todo } = useTodo(params.id || '');

  if (!params.id) return <>찾을 수 없는 페이지</>;
  if (!todo) return <>찾을 수 없는 todo</>;

  return (
    <Column>
      <EditTodoForm todo={todo} />
      <DeleteTodo
        id={params.id}
        styled={{ trigger: { width: '100%', marginTop: 8 } }}
      />
    </Column>
  );
};
