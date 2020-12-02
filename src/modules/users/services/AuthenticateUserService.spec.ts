import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository);
    const authenticateUser = new AuthenticateUserService(fakeUserRepository);

    await createUser.execute({
      name: 'asdfgasdf',
      email: 'asdasdasd@asdasd.com',
      password: '12312445',
    });

    const response = await authenticateUser.execute({
      email: 'asdasdasd@asdasd.com',
      password: '12312445',
    });

    expect(response).toHaveProperty('token');
  });
});
