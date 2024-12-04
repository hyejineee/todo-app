import { Row } from '@/shared/ui';
import { Button } from '@/shared/ui/components/button';
import { Card } from '@/shared/ui/components/card';
import { Link, Outlet } from 'react-router-dom';
import { TodoList } from '../entities/todo/ui';

export const TodosPage = () => {
  return (
    <Row
      css={{
        padding: '50px 200px',
        width: '100%',
        height: '100%',
        minWidth: 1020,
        gap: 16,
        margin: '0 auto',
      }}
    >
      <Card css={{ width: '35%', height: '100%', padding: 16 }}>
        <Link to="/todos/create">
          <Button css={{ width: '100%', marginBottom: 24 }}>CREATE TODO</Button>
        </Link>
        <TodoList />
      </Card>
      <Card css={{ width: '65%', height: '100%', padding: 16 }}>
        <Outlet />
      </Card>
    </Row>
  );
};
