import type { IAuthRepository } from '@entities';
import type { Email, Password } from '@shared';

export class RegisterUserUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(params: { email: Email; password: Password }) {
    return await this.authRepository.register(params);
  }
}
