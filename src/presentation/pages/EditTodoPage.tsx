import { useParams } from 'react-router-dom';
import { useTodo } from '../entities/todo/api';
import { EditTodoForm } from '../features/todo';

export const EditTodoPage = () => {
  const param = useParams();
  const id = param.id;

  const { data: todo } = useTodo(id || '');

  if (!todo) return <>없는 todo다</>;
  return <EditTodoForm todo={todo} />;
};
