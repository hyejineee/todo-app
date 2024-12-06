import type { Todo } from '@domain/todo';
import type { TodoFilter } from '../types';

export interface ITodoRepository {
  findAll(filter?: Partial<TodoFilter>): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  create(todo: Todo): Promise<Todo>;
  update(id: string, todo: Todo): Promise<void>;
  delete(id: string): Promise<void>;
}
