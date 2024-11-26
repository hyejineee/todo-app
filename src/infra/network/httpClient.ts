import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';

export class HttpClient {
  private _instance: AxiosInstance;

  constructor(
    private readonly baseUrl: string,
    config?: CreateAxiosDefaults,
  ) {
    this._instance = axios.create({
      ...config,
      baseURL: baseUrl,
    });
  }

  get instance() {
    return this._instance;
  }
}
