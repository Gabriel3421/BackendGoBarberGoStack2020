import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'asdfgasdf',
      email: 'asdasdasd@asdasd.com',
      password: '12312445',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with an existing email', async () => {
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
