import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';
import Orphanage from '../models/Orphanage';

export default {
  async create(req: Request, res: Response) {
    const orphanageInfo = req.body

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename }
    })
    orphanageInfo['images'] = images


    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    })

    await schema.validate(orphanageInfo, { abortEarly: false })

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = orphanagesRepository.create(orphanageInfo);

    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
  },

  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanagesAll = await orphanagesRepository.find({
      relations: ['images']
    });
    return res.json(orphanageView.renderMany(orphanagesAll));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params
    const orphanagesRepository = getRepository(Orphanage);
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });
    return res.json(orphanageView.render(orphanage))
  }
};