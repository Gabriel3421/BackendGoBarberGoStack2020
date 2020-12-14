import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const user = await createUser.execute({
      name: 'asdfgasdf',
      email: 'asdasdasd@asdasd.com',
      password: '12312445',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with an existing email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    await createUser.execute({
      name: 'asdfgasdf',
      email: 'asdasdasd@asdasd.com',
      password: '12312445',
    });

    await expect(
      createUser.execute({
        name: 'asdfgasdf',
        email: 'asdasdasd@asdasd.com',
        password: '12312445',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
