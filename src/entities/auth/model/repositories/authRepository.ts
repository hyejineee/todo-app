import type { Email, Password } from '@shared';
import type { AuthToken } from '../domain';

export interface IAuthRepository {
  login(params: { email: Email; password: Password }): Promise<AuthToken>;
  register(params: { email: Email; password: Password }): Promise<AuthToken>;
}
