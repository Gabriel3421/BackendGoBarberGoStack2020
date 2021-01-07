import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepositories from '../repositories/IAppointmentsRepositories';

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepositories,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: Request): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );
    return appointments;
  }
}

export default ListProviderAppointmentsService;