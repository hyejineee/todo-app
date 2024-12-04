import { DI_TYPES } from '@/shared/config';
import { inject, injectable } from 'inversify';
import type { ITodoRepository } from '../repositories';

@injectable()
export default class GetTodosUseCase {
  private todoRepository: ITodoRepository;
  constructor(
    @inject(DI_TYPES.ITodoRepository) todoRepository: ITodoRepository,
  ) {
    this.todoRepository = todoRepository;
  }

  async execute() {
    return await this.todoRepository.findAll();
  }
}
