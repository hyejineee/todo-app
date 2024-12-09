import type { PriorityType } from '@/domain/todo/vo/priority';
import { Column, Row } from '@/shared/ui';
import { Card } from '@/shared/ui/components/card';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PriorityFilter } from '../features/todo/ui';
import { TodoListBoard } from '../widgets/todo';

export const TodosPage = () => {
  const location = useLocation();
  const [priorityFilter, setPriorityFilter] = useState<PriorityType | 'all'>(
    'all',
  );

  console.log('dd', location.pathname);
  return (
    <Row
      css={{
        padding: '50px 100px',
        width: '100%',
        height: '100%',
        minWidth: 1020,
        gap: 16,
        margin: '0 auto',
      }}
    >
      <Card
        css={{ minWidth: '35%', height: '100%', width: '100%', padding: 16 }}
      >
        <Column css={{ gap: 24 }}>
          <PriorityFilter
            value={priorityFilter}
            onFilterChange={(priority) => setPriorityFilter(priority)}
          />
          <Row css={{ gap: 24 }}>
            <TodoListBoard
              status="notStarted"
              title="✋ Not Started"
              priorityFilter={priorityFilter}
            />
            <TodoListBoard
              status="inProgress"
              title="🏃🏻‍♀️ In Progress"
              priorityFilter={priorityFilter}
            />
            <TodoListBoard
              status="done"
              title="✅ Done"
              priorityFilter={priorityFilter}
            />
          </Row>
        </Column>
      </Card>
    </Row>
  );
};
