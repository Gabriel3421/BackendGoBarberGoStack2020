import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const SendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
    );
    await fakeUserRepository.create({
      name: 'asdasd',
      email: 'asdasdasd@asdasd.com',
      password: '123123',
    });

    await SendForgotPasswordEmail.execute({
      email: 'asdasdasd@asdasd.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
