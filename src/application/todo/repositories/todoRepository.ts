import type { Todo } from '@domain/todo';

export interface ITodoRepository {
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  create(todo: Todo): Promise<void>;
  update(id: string, todo: Todo): Promise<void>;
  delete(id: string): Promise<void>;
}
