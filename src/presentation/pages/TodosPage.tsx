import { Row } from '@/shared/ui';
import { Card } from '@/shared/ui/components/card';
import { Outlet } from 'react-router-dom';

export const TodosPage = () => {
  return (
    <Row css={{ padding: 24, width: '100%', height: '100%', gap: 16 }}>
      <Card css={{ width: '35%', height: '100%', padding: 16 }}>
        todo list page
      </Card>
      <Card css={{ width: '65%', height: '100%', padding: 16 }}>
        <Outlet />
      </Card>
    </Row>
  );
};
