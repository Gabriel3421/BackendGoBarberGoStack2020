import { injectable, inject } from 'tsyringe';
import IAppointmentsRepositories from '../repositories/IAppointmentsRepositories';

interface Request {
  user_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;
@injectable()
class ListMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepositories,
  ) {}

  public async execute({ user_id, year, month }: Request): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      { provider_id: user_id, month, year },
    );
    return [{ day: 1, available: false }];
  }
}

export default ListMonthAvailabilityService;
