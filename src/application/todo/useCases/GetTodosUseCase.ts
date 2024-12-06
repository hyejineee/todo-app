import { DI_TYPES } from '@/shared/config';
import { inject, injectable } from 'inversify';
import type { ITodoRepository } from '../repositories';
import type { TodoFilter } from '../types';

@injectable()
export default class GetTodosUseCase {
  private todoRepository: ITodoRepository;
  constructor(
    @inject(DI_TYPES.ITodoRepository) todoRepository: ITodoRepository,
  ) {
    this.todoRepository = todoRepository;
  }

  async execute(filter?: Partial<TodoFilter>) {
    return await this.todoRepository.findAll(filter);
  }
}
