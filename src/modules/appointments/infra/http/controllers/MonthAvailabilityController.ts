import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ListMonthAvailabilityService from '@modules/appointments/services/ListMonthAvailabilityService';

export default class MonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listMonthAvailabilityService = container.resolve(
      ListMonthAvailabilityService,
    );

    const availability = await listMonthAvailabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });
    return response.json(availability);
  }
}
