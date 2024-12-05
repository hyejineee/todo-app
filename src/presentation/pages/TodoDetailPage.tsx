import { useParams } from 'react-router-dom';
import { TodoDetail } from '../entities/todo/ui';

export const TodoDetailPage = () => {
  const params = useParams();

  if (!params.id) return <>찾을 수 없는 페이지</>;
  return <TodoDetail id={params.id} />;
};
