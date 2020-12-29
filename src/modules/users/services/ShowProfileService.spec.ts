import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfile = new ShowProfileService(fakeUserRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@a.com',
      password: '123',
    });
    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('aaa');
    expect(profile.email).toBe('aaa@a.com');
  });
  it('should not be able to show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'asd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
