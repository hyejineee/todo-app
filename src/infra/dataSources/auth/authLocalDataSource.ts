import type { AuthResponseDTO } from '@infra/dto';
import type { HttpClient } from '@infra/network';
import { DI_TYPES } from '@shared';
import { inject, injectable } from 'inversify';

@injectable()
export class AuthRemoteDataSource {
  private httpClient: HttpClient;

  constructor(@inject(DI_TYPES.HttpClient) httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  static API_KEY = {
    LOGIN: '/users/login',
    REGIStER: '/users/create',
  };

  async login(params: {
    email: string;
    password: string;
  }): Promise<AuthResponseDTO> {
    return (
      await this.httpClient.instance.post<AuthResponseDTO>(
        AuthRemoteDataSource.API_KEY.LOGIN,
        {
          email: params.email,
          password: params.password,
        },
      )
    ).data;
  }
  async register(params: {
    email: string;
    password: string;
  }): Promise<AuthResponseDTO> {
    return (
      await this.httpClient.instance.post<AuthResponseDTO>(
        AuthRemoteDataSource.API_KEY.REGIStER,
        {
          email: params.email,
          password: params.password,
        },
      )
    ).data;
  }
}
