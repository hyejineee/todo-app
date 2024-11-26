import type { Email, Password } from '@domain/auth';
import { DI_TYPES } from '@shared';
import { inject, injectable } from 'inversify';
import type { IAuthRepository } from '../repositories';

@injectable()
export class RegisterUserUseCase {
  private readonly authRepository: IAuthRepository;
  constructor(
    @inject(DI_TYPES.IAuthRepository) authRepository: IAuthRepository,
  ) {
    this.authRepository = authRepository;
  }

  async execute(params: { email: Email; password: Password }) {
    return await this.authRepository.register(params);
  }
}
