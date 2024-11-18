import { DataSourceReturnType } from '@shared';
import type { AuthResponseDTO } from '../dto';

export interface AuthDataSource<Remote extends boolean = false> {
  login(params: {
    email: string;
    password: string;
  }): DataSourceReturnType<Remote, AuthResponseDTO>;
  register(params: {
    email: string;
    password: string;
  }): DataSourceReturnType<Remote, AuthResponseDTO>;
}
