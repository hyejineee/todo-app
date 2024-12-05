import { Column } from '@/shared/ui';
import { useTodo } from '../api';
import { TodoStatus } from './TodoStatus';

type TodoDetailProps = {
  id: string;
};

export const TodoDetail = (props: TodoDetailProps) => {
  const { id } = props;
  const { data: todo } = useTodo(id);

  if (!todo) return <>todo를 찾을 수 없어</>;
  return (
    <Column>
      <span css={{ color: '#999', fontSize: 14, marginBottom: 24 }}>
        {todo?.getCreatedAt().toDateString()}
      </span>

      <TodoStatus
        priority={todo?.getPriority()}
        status={todo?.getStatus()}
        styled={{ marginBottom: 8 }}
      />

      <h1 css={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>
        {todo?.getTitle().getValue()}
      </h1>

      <p>{todo.getContent().getValue()}</p>
    </Column>
  );
};
