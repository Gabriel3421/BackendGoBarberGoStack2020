import { injectable, inject } from 'tsyringe';
import { getDaysInMonth } from 'date-fns';
import { getDate } from 'date-fns/esm';
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
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListMonthAvailabilityService;
