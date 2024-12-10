import type { PriorityType } from '@/domain/todo/vo/priority';
import type { StatusType } from '@/domain/todo/vo/status';
import { useTodos } from '@/presentation/entities/todo/api';
import { TodoList } from '@/presentation/entities/todo/ui';
import { Column } from '@/shared/ui';
import { Button } from '@/shared/ui/components/button';
import { Link } from 'react-router-dom';

type TodoListBoardProps = {
  status: StatusType;
  title: string;
  priorityFilter: PriorityType | 'all';
};
export const TodoListBoard = (props: TodoListBoardProps) => {
  const { status, title, priorityFilter } = props;

  const { data: todos } = useTodos({
    priorityFilter: priorityFilter === 'all' ? undefined : priorityFilter,
    statusFilter: status,
  });

  return (
    <Column css={{ gap: 8, height: '100%', flex: 1 }}>
      <h1 css={{ fontWeight: 'bold', fontSize: 32 }}>{title}</h1>

      <Link to={`/todos/create?status=${status}`}>
        <Button css={{ width: '100%', marginBottom: 24 }}>CREATE TODO</Button>
      </Link>

      <Column css={{ overflow: 'auto', height: 'calc(100% - 64px)' }}>
        <TodoList todos={todos || []} />
      </Column>
    </Column>
  );
};
