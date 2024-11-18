import type { IAuthRepository, ITokenRepository } from '@entities';
import type { Email, Password } from '@shared';

export class LoginUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly tokenRepository: ITokenRepository,
  ) {}

  async execute(params: { email: Email; password: Password }) {
    const token = await this.authRepository.login(params);
    this.tokenRepository.save(token);
  }
}
