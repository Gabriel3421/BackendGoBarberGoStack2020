import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointments';
import IappointmentsRepository from '../repositories/IAppointmentsRepositories';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appointmentRepository: IappointmentsRepository){}
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('horario ja marcado');
    }

    const app = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });
    return app;
  }
}

export default CreateAppointmentService;
