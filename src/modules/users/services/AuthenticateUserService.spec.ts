import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'asdfgasdf',
      email: 'asdasdasd@asdasd.com',
      password: '12312445',
    });

    const response = await authenticateUser.execute({
      email: 'asdasdasd@asdasd.com',
      password: '12312445',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'asdasdasd@asdasd.com',
        password: '12312445',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'asdfgasdf',
      email: 'asdasdasd@asdasd.com',
      password: '12312445',
    });

    await expect(
      authenticateUser.execute({
        email: 'asdasdasd@asdasd.com',
        password: '321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
