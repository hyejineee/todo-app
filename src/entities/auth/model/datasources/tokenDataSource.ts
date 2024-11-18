import type { DataSourceReturnType } from '@shared';
import type { AuthToken } from '../domain/AuthToken';

export interface TokenDataSource<Remote extends boolean = false> {
  saveToken(token: string): DataSourceReturnType<Remote, void>;
  removeToken(): DataSourceReturnType<Remote, void>;
  getToken(): DataSourceReturnType<Remote, AuthToken | null>;
}
