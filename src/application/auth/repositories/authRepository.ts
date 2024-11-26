import type { Email, Password, Token } from '@domain/auth';

export interface IAuthRepository {
  login(params: { email: Email; password: Password }): Promise<Token>;
  register(params: { email: Email; password: Password }): Promise<Token>;
}
