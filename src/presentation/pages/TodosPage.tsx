import { Row } from '@shared/ui';
import { Outlet } from 'react-router-dom';

export const TodosPage = () => {
  return (
    <Row>
      todo list page <Outlet />
    </Row>
  );
};
