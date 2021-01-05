import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
}
@injectable()
class ListProvidersService {
  constructor(
    @inject('UserRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      exept_user_id: user_id,
    });

    return users;
  }
}

export default ListProvidersService;
