import type { AuthToken } from '../domain';

export interface ITokenRepository {
  save(token: AuthToken): void;
  remove(): void;
  get(): AuthToken | null;
}
