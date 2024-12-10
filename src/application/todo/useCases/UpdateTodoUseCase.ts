import type { Todo } from '@/domain/todo';
import { DI_TYPES } from '@/shared/config';
import { inject, injectable } from 'inversify';
import type { ITodoRepository } from '../repositories';

@injectable()
export default class UpdateTodoUseCase {
  constructor(
    @inject(DI_TYPES.ITodoRepository) private todoRepository: ITodoRepository,
  ) {}

  async execute(params: { id: string; todo: Todo }) {
    const { id, todo } = params;
    await this.todoRepository.update(id, todo);
  }
}
