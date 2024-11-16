import type { DataSourceReturnType } from '@shared';
import type { AuthToken } from './AuthToken';

export interface TokenDataSource<Remote extends boolean = false> {
  saveToken(token: AuthToken): DataSourceReturnType<Remote, void>;
  removeToken(): DataSourceReturnType<Remote, void>;
  getToken(): DataSourceReturnType<Remote, AuthToken | null>;
}
