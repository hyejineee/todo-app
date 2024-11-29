import type { Todo } from '@domain/todo';
import { DI_TYPES } from '@shared/config';
import { inject, injectable } from 'inversify';
import type { ITodoRepository } from '../repositories';

@injectable()
export default class CreateTodoUseCase {
  private todoRepository: ITodoRepository;
  constructor(
    @inject(DI_TYPES.ITodoRepository) todoRepository: ITodoRepository,
  ) {
    this.todoRepository = todoRepository;
  }

  async execute(todo: Todo) {
    await this.todoRepository.create(todo);
  }
}
