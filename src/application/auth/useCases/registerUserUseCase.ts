import type { Email, Password } from '@domain';
import type { IAuthRepository } from '@repositories';

export class RegisterUserUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(params: { email: Email; password: Password }) {
    return await this.authRepository.register(params);
  }
}
