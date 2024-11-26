import type { Token } from '@domain/auth';

export interface ITokenRepository {
  save(token: Token): void;
  remove(): void;
  get(): Token | null;
}
