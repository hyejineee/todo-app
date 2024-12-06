import type { TodoFilter } from '@/application/todo/types';
import { useQuery } from '@tanstack/react-query';
import { todoKeys } from './queries';

export const useTodos = (filter?: Partial<TodoFilter>) => {
  const queryResult = useQuery(todoKeys.list({ filter }));
  return queryResult;
};
