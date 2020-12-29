import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'ashaudh',
      email: 'eftghqeth@asdasd.com',
      password: '123',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'aaa',
      email: 'aaa@a.com',
    });

    expect(updateUser.name).toBe('aaa');
    expect(updateUser.email).toBe('aaa@a.com');
  });
  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'ashaudh',
      email: 'a@a.com',
      password: '123',
    });
    const user = await fakeUserRepository.create({
      name: 'ashaudh',
      email: 'g@g.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'aaa',
        email: 'a@a.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'ashaudh',
      email: 'eftghqeth@asdasd.com',
      password: '123',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'aaa',
      email: 'aaa@a.com',
      old_password: '123',
      password: '321',
    });

    expect(updateUser.password).toBe('321');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'ashaudh',
      email: 'eftghqeth@asdasd.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'aaa',
        email: 'aaa@a.com',
        password: '321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'ashaudh',
      email: 'eftghqeth@asdasd.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'aaa',
        email: 'aaa@a.com',
        old_password: 'asd',
        password: '321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'asd',
        name: 'asda',
        email: 'aaa@a.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
