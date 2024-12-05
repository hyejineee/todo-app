import type { Todo } from '@/domain/todo';
import type { StyledProps } from '@/shared/ui';
import { createContext, useContext, type ReactNode } from 'react';
import { useTodo } from '../api';
import { TodoStatus } from './TodoStatus';

const TodoDetailContext = createContext<Todo | undefined>(undefined);

type TodoDetailProps = {
  id: string;
  children: ReactNode[] | ReactNode;
};
const TodoDetailProvider = (props: TodoDetailProps) => {
  const { id } = props;
  const { data: todo } = useTodo(id);

  if (!todo) return <>todo를 찾을 수 없어</>;
  return (
    <TodoDetailContext.Provider value={todo}>
      {props.children}
    </TodoDetailContext.Provider>
  );
};

const useTodoContext = () => {
  const todo = useContext(TodoDetailContext);
  if (!todo) throw Error('todo is undefined');
  return todo;
};

const CreatedAt = (props: StyledProps) => {
  const todo = useTodoContext();
  return (
    <span css={[props?.styled, { color: '#999', fontSize: 14 }]}>
      {todo?.getCreatedAt().toDateString()}
    </span>
  );
};
const Title = (props: StyledProps) => {
  const todo = useTodoContext();

  return (
    <h1 css={[props?.styled, { fontSize: 28, fontWeight: 'bold' }]}>
      {todo?.getTitle().getValue()}
    </h1>
  );
};
const Status = (props: StyledProps) => {
  const todo = useTodoContext();
  return (
    <TodoStatus
      priority={todo?.getPriority()}
      status={todo?.getStatus()}
      styled={props?.styled}
    />
  );
};
const Content = (props: StyledProps) => {
  const todo = useTodoContext();
  return <p css={[props?.styled]}>{todo.getContent().getValue()}</p>;
};

export const TodoDetail = Object.assign(TodoDetailProvider, {
  CreatedAt,
  Title,
  Status,
  Content,
});
