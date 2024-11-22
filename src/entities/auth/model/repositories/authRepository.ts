import type { Email, Password, Token } from '@shared';

export interface IAuthRepository {
  login(params: { email: Email; password: Password }): Promise<Token>;
  register(params: { email: Email; password: Password }): Promise<Token>;
}
