export interface AuthService {
  login(email: string, password: string): Promise<string>;
  signUp(email: string, password: string): Promise<void>;
}
