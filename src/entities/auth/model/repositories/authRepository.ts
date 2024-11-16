import type { AuthToken } from '@shared';

export interface IAuthRepository {
  login(params: { email: string; password: string }): Promise<AuthToken>;
  register(params: { email: string; password: string }): Promise<AuthToken>;
}
