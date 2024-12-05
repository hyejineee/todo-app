import { useQuery } from '@tanstack/react-query';
import { todoKeys } from './queries';

export const useTodo = (id: string) => {
  const queryResult = useQuery(todoKeys.detail({ id }));
  return queryResult;
};
