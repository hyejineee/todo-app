import { Email, Password, type HttpClient } from '@shared';
import type { AuthDataSource, AuthResponseDTO } from '../model';

export class AuthRemoteDataSource implements AuthDataSource<true> {
  constructor(private httpClient: HttpClient) {}
  login(params: {
    email: Email;
    password: Password;
  }): Promise<AuthResponseDTO> {
    throw new Error('Method not implemented.');
  }
  register(params: {
    email: Email;
    password: Password;
  }): Promise<AuthResponseDTO> {
    throw new Error('Method not implemented.');
  }
}
