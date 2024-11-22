import type { Email, IAuthRepository, Password } from '@entities';

export class RegisterUserUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(params: { email: Email; password: Password }) {
    return await this.authRepository.register(params);
  }
}
