import { Column } from '@/shared/ui';
import { Card } from '@/shared/ui/components/card';
import { type Todo } from '@domain/todo';
import { Link } from 'react-router-dom';
import { useTodos } from '../api';
import { TodoStatus } from './TodoStatus';

export const TodoList = () => {
  const { data: todos } = useTodos();

  return (
    <Column css={{ gap: 8 }}>
      {todos?.map((todo) => <TodoItem todo={todo} />)}
    </Column>
  );
};

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = (props: TodoItemProps) => {
  const { todo } = props;

  return (
    <Link to={`/todos/${todo.getId()}`}>
      <Card
        css={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <span css={{ color: '#999', fontSize: 12 }}>
          {todo.getCreatedAt().toDateString()}
        </span>

        <TodoStatus priority={todo.getPriority()} status={todo.getStatus()} />

        <span css={{ fontSize: 20 }}>{todo.getTitle().getValue()}</span>
        <span css={{ fontSize: 12 }}>{todo.getContent().getValue()}</span>
      </Card>
    </Link>
  );
};
