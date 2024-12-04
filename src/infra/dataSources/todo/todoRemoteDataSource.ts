import type { TodoDto, TodosResponseDto } from '@/infra/dto/todo';
import { Content, Priority, Status, Title, Todo } from '@domain/todo';
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
      await this.httpClient.instance.post(
        TodoRemoteDataSource.API_KEY.CREATE,
        this.entityMapToDto(todo),
      )
    ).data;
  }

  async updateTodo(id: string, todo: Todo) {
    return (
      await this.httpClient.instance.put(
        TodoRemoteDataSource.API_KEY.UPDATE(id),
        this.entityMapToDto(todo),
      )
    ).data;
  }

  async getTodoList(): Promise<Todo[]> {
    const todos = (
      await this.httpClient.instance.get<TodosResponseDto<TodoDto[]>>(
        TodoRemoteDataSource.API_KEY.GET_LIST,
      )
    ).data.data;

    return todos.map((todo) => this.dtoMapToEntity(todo));
  }

  async getTodo(id: string): Promise<Todo> {
    const todo = (
      await this.httpClient.instance.get<TodosResponseDto<Todo>>(
        TodoRemoteDataSource.API_KEY.GET(id),
      )
    ).data.data;
    return todo;
  }

  async deleteTodo(id: string) {
    return (
      await this.httpClient.instance.delete(
        TodoRemoteDataSource.API_KEY.DELETE(id),
      )
    ).data;
  }

  private dtoMapToEntity(dto: TodoDto) {
    try {
      const title = Title.create(dto.title);
      const content = Content.create(dto.content);
      const priority = Priority.create(dto.priority);
      const status = Status.create(dto.status);
      const createdAt = new Date(dto.createdAt);

      if (!title.isSuccess) throw title.errors;
      if (!content.isSuccess) throw content.errors;
      if (!priority.isSuccess) throw priority.errors;
      if (!status.isSuccess) throw status.errors;

      return new Todo({
        id: dto.id,
        title: title.value,
        content: content.value,
        priority: priority.value,
        status: status.value,
        createdAt,
      });
    } catch (e) {
      console.error(e);
      throw new Error('Error mapping DTO to entity');
    }
  }

  private entityMapToDto(todo: Todo) {
    return {
      title: todo.getTitle().getValue(),
      content: todo.getContent().getValue(),
      priority: todo.getPriority().getValue(),
      status: todo.getStatus().getValue(),
    };
  }
}
