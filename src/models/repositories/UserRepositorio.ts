import { EntityRepository, Repository } from 'typeorm';
import { User } from '../User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async saveUser(user: User): Promise<User> {
    return this.save(user);
  }

  async findById(id: number): Promise<User | null> {
    return this.findOne({ where: { id } });
  }
}
