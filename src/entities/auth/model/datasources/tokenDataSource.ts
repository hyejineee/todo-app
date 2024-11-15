import {} from "";
export interface TokenDataSource<Remote extends boolean = false> {
  saveToken(token: string): ReturnType<Remote, void>;
  removeToken(): ReturnType<Remote, void>;
}
