import type { TokenLocalDataSource } from '@infra/dataSources/auth';
import { DI_TYPES } from '@shared/config';
import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';
import { inject, injectable } from 'inversify';

@injectable()
export class HttpClient {
  private _instance: AxiosInstance;
  private _tokenDataSource: TokenLocalDataSource;

  constructor(
    baseUrl: string,
    @inject(DI_TYPES.TokenLocalDataSource)
    tokenDataSource: TokenLocalDataSource,
    config?: CreateAxiosDefaults,
  ) {
    this._instance = axios.create({
      ...config,
      baseURL: baseUrl,
    });

    this._tokenDataSource = tokenDataSource;

    this._instance.interceptors.request.use(async (config) => {
      const token = await this._tokenDataSource.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  get instance() {
    return this._instance;
  }
}
