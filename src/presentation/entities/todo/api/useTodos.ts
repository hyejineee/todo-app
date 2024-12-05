import { useQuery } from '@tanstack/react-query';
import { todoKeys } from './queries';

export const useTodos = () => {
  const queryResult = useQuery(todoKeys.list);
  return queryResult;
};
