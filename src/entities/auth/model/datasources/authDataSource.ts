import { DataSourceReturnType, type Email, type Password } from '@shared';
import type { AuthResponseDTO } from '../dto';

export interface AuthDataSource<Remote extends boolean = false> {
  login(params: {
    email: Email;
    password: Password;
  }): DataSourceReturnType<Remote, AuthResponseDTO>;
  register(params: {
    email: Email;
    password: Password;
  }): DataSourceReturnType<Remote, AuthResponseDTO>;
}
