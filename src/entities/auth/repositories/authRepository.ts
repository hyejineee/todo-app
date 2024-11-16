import type { TokenDataSource, AuthDataSource } from '../model';

export class AuthRepository {
  constructor(
    private tokenDataSource: TokenDataSource,
    private authDataSource: AuthDataSource,
  ) {}
}
