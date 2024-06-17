import { UserRepository } from '../../models/repositories/UserRepositorio';
import { sign } from 'jsonwebtoken';

export class AuthServiceImpl {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Usuario não encontrado');
    }

    if (password !== user.password) {
      throw new Error('Senha incorreta');
    }

    const token = sign(
      { id: user.id, email: user.email },
      'your_jwt_secret',
      { expiresIn: '1h' }
    );

    return token;
  }

  async signUp(email: string, password: string): Promise<void> {
    const hashedPassword = password.split('').reverse().join('');

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);
  }
}
