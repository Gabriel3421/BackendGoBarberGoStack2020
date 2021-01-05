import 'reflect-metadata';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listProviders = new ListProvidersService(fakeUserRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@a.com',
      password: '123',
    });
    const user2 = await fakeUserRepository.create({
      name: 'bbb',
      email: 'bbb@a.com',
      password: '123',
    });
    const loggedUser = await fakeUserRepository.create({
      name: 'ccc',
      email: 'ccc@a.com',
      password: '123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });
    expect(providers).toEqual([user1, user2]);
  });
});
