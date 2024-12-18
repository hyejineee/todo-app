import type { TodoFilter } from '@/application/todo/types';
import type { ITodoRepository } from '@application/todo/repositories/todoRepository';
import type { Todo } from '@domain/todo';
import type { TodoRemoteDataSource } from '@infra/dataSources/todo';
import { DI_TYPES } from '@shared/config';
import { inject, injectable } from 'inversify';

@injectable()
export default class TodoRepositoryImpl implements ITodoRepository {
  private todoDataSource: TodoRemoteDataSource;
  constructor(
    @inject(DI_TYPES.TodoRemoteDataSource) todoDataSource: TodoRemoteDataSource,
  ) {
    this.todoDataSource = todoDataSource;
  }

  async create(todo: Todo): Promise<Todo> {
    return await this.todoDataSource.createTodo(todo);
  }

  async update(id: string, todo: Todo): Promise<void> {
    await this.todoDataSource.updateTodo(id, todo);
  }

  async findAll(filter?: Partial<TodoFilter>): Promise<Todo[]> {
    return await this.todoDataSource.getTodoList(filter);
  }

  async findById(id: string): Promise<Todo | null> {
    const data = await this.todoDataSource.getTodo(id);
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.todoDataSource.deleteTodo(id);
  }
}
