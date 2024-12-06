import { DI_TYPES } from '@/shared/config';
import { inject, injectable } from 'inversify';
import type { ITodoRepository } from '../repositories';

@injectable()
export default class DeleteTodoUseCase {
  constructor(
    @inject(DI_TYPES.ITodoRepository) private todoRepository: ITodoRepository,
  ) {}

  async execute(id: string) {
    await this.todoRepository.delete(id);
  }
}
