import type { Todo } from '@domain/todo';
import type { HttpClient } from '@infra/network';
import { DI_TYPES } from '@shared/config';
import { inject, injectable } from 'inversify';

@injectable()
export default class TodoRemoteDataSource {
  private httpClient: HttpClient;
  static API_KEY = {
    GET_LIST: '/todos',
    GET: (id: string) => `/todos/${id}`,
    UPDATE: (id: string) => `/todos/${id}`,
    DELETE: (id: string) => `/todos/${id}`,
    CREATE: '/todos',
  } as const;

  constructor(@inject(DI_TYPES.HttpClient) httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async createTodo(todo: Todo) {
    return (
      await this.httpClient.instance.post(TodoRemoteDataSource.API_KEY.CREATE, {
        title: todo.getTitle().getValue(),
        content: todo.getStatus().getValue(),
      })
    ).data;
  }

  async updateTodo(id: string, todo: Todo) {
    return (
      await this.httpClient.instance.put(
        TodoRemoteDataSource.API_KEY.UPDATE(id),
        {
          title: todo.getTitle().getValue(),
          content: todo.getStatus().getValue(),
        },
      )
    ).data;
  }

  async getTodoList() {
    return (
      await this.httpClient.instance.get(TodoRemoteDataSource.API_KEY.GET_LIST)
    ).data;
  }

  async getTodo(id: string) {
    return (
      await this.httpClient.instance.get(TodoRemoteDataSource.API_KEY.GET(id))
    ).data;
  }

  async deleteTodo(id: string) {
    return (
      await this.httpClient.instance.delete(
        TodoRemoteDataSource.API_KEY.DELETE(id),
      )
    ).data;
  }
}
