import { Column, Row } from '@/shared/ui';
import { Button } from '@/shared/ui/components/button';
import { Link, useLocation, useParams } from 'react-router-dom';
import { TodoDetail } from '../entities/todo/ui';
import { DeleteTodo } from '../features/todo/ui';

export const TodoDetailPage = () => {
  const location = useLocation();
  const params = useParams();

  if (!params.id) return <>찾을 수 없는 페이지</>;
  return (
    <Column>
      <TodoDetail id={params.id}>
        <Row
          css={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 48,
          }}
        >
          <TodoDetail.CreatedAt />
          <Row css={{ gap: 8 }}>
            <DeleteTodo id={params.id} />
            <Link to={`${location.pathname}/edit`}>
              <Button variant={'outline'}>EDIT</Button>
            </Link>
          </Row>
        </Row>

        <TodoDetail.Status styled={{ marginBottom: 4 }} />
        <TodoDetail.Title styled={{ marginBottom: 20 }} />
        <TodoDetail.Content />
      </TodoDetail>
    </Column>
  );
};
