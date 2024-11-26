import type { Email, Password } from '@domain/auth';
import { DI_TYPES } from '@shared';
import { inject, injectable } from 'inversify';
import type { IAuthRepository, ITokenRepository } from '../repositories';

@injectable()
export class LoginUseCase {
  private readonly tokenRepository: ITokenRepository;
  private readonly authRepository: IAuthRepository;

  constructor(
    @inject(DI_TYPES.IAuthRepository) authRepository: IAuthRepository,
    @inject(DI_TYPES.ITokenRepository) tokenRepository: ITokenRepository,
  ) {
    this.tokenRepository = tokenRepository;
    this.authRepository = authRepository;
  }

  async execute(params: { email: Email; password: Password }) {
    const token = await this.authRepository.login(params);
    this.tokenRepository.save(token);
  }
}
