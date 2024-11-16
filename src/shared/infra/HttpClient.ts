import { TokenDataSource } from './tokenDataSource';
// infrastructure/http/http-client.ts
export class HttpClient {
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(
    private readonly baseURL: string,
    private readonly TokenDataSource: TokenDataSource,
  ) {}

  private async getHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const accessToken = this.authStorage.get('accessToken');
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    // 401 에러 처리 (토큰 만료)
    if (response.status === 401) {
      try {
        const newToken = await this.handleTokenRefresh();
        // 새로운 토큰으로 원래 요청 재시도
        const retryResponse = await fetch(response.url, {
          ...response,
          headers: {
            ...response.headers,
            Authorization: `Bearer ${newToken}`,
          },
        });
        return this.parseResponse<T>(retryResponse);
      } catch (error) {
        // 리프레시 토큰도 만료된 경우
        this.authStorage.clear();
        window.location.href = '/login';
        throw new Error('Session expired');
      }
    }

    return this.parseResponse<T>(response);
  }

  private async handleTokenRefresh(): Promise<string> {
    // 이미 리프레시 진행 중이면 대기
    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.refreshSubscribers.push(resolve);
      });
    }

    this.isRefreshing = true;

    try {
      const refreshToken = this.authStorage.get('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const tokens = await this.refreshTokenUseCase.execute(refreshToken);

      // 새 토큰 저장
      this.authStorage.set('accessToken', tokens.accessToken);
      this.authStorage.set('refreshToken', tokens.refreshToken);

      // 대기 중인 요청들에게 새 토큰 전달
      this.refreshSubscribers.forEach((callback) =>
        callback(tokens.accessToken),
      );
      this.refreshSubscribers = [];

      return tokens.accessToken;
    } finally {
      this.isRefreshing = false;
    }
  }
}
