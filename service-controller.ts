import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Service from '../models/Service';

import AppError from '../errors/AppError';

class ServiceController {
  async index(req: Request, res: Response) {
    const TAKE_AMOUNT = '3';
    const serviceRepository = getRepository(Service);
    const { page: queryPage, take: queryTake } = req.query;
    const page = parseInt(queryPage?.toString() || '0');
    const take = parseInt(queryTake?.toString() || TAKE_AMOUNT);
    const skipAmount = page * take;

    const [response, servicesCount] = await serviceRepository.findAndCount({
      take,
      skip: skipAmount,
    });

    const hasNext = skipAmount + take < servicesCount;
    const hasPrev = page > 0;

    if (!response.length) res.status(204);

    res.json({ services: response, pagination: { hasNext, hasPrev } });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const serviceRepository = getRepository(Service);

    try {
      const response = await serviceRepository.findOneOrFail({ id });

      res.json(response);
    } catch (err) {
      throw new AppError('Service not found', 404);
    }
  }

  async create(req: Request, res: Response) {
    const { name, image_url } = req.body;

    const serviceRepository = getRepository(Service);

    const service = serviceRepository.create({ name, image_url });

    await serviceRepository.save(service);

    res.json(service);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const serviceRepository = getRepository(Service);

    try {
      const service = await serviceRepository.update(id, req.body);

      res.json(service);
    } catch (err) {
      throw new AppError('Service not found', 404);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const serviceRepository = getRepository(Service);

    const response = await serviceRepository.delete({ id });

    if (response.affected === 0) {
      throw new AppError('Service not found', 404);
    }

    res.json(response);
  }
}

export default new ServiceController();
