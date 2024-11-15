import type { TokenDataSource } from "../model";
import type { AuthResponseDTO } from "../model/dto/authResponseDto";

export interface IAuthRepository {
  login(req: { email: string; password: string }): Promise<AuthResponseDTO>;
  signUp(req: { email: string; password: string }): Promise<AuthResponseDTO>;
}

export class AuthRepository {
  constructor(private tokenDataSource: TokenDataSource) {}
}
