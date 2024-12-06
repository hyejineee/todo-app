import { useTodos } from '@/presentation/entities/todo/api';
import { TodoList } from '@/presentation/entities/todo/ui';
import { PriorityFilter } from '@/presentation/features/todo/ui';
import { Column } from '@/shared/ui';
import { Button } from '@/shared/ui/components/button';
import { Link } from 'react-router-dom';

export const TodoListBoard = () => {
  const { data: todos } = useTodos();
  return (
    <Column>
      <Link to="/todos/create">
        <Button css={{ width: '100%', marginBottom: 24 }}>CREATE TODO</Button>
      </Link>
      <PriorityFilter />
      <Column css={{ overflow: 'auto', height: 'calc(100% - 64px)' }}>
        <TodoList todos={todos || []} />
      </Column>
    </Column>
  );
};
