import { Row } from '@/shared/ui';
import { Card } from '@/shared/ui/components/card';
import { Outlet } from 'react-router-dom';

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
        todo list page
      </Card>
      <Card css={{ width: '65%', height: '100%', padding: 16 }}>
        <Outlet />
      </Card>
    </Row>
  );
};
