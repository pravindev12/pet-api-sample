const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pet name'),
    age: Joi.number().integer().required().description('Pet age'),
    colour: Joi.string().required().description('Pet colour'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet = new Pet(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/' ,
  async (req, res, next) => {
    try {
      let pets = await Pet.find({});
      res.status(200).json(pets);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:id' ,
  async (req, res, next) => {
    try {
      let pet = await Pet.findOne({ _id: req.params.id });
      res.status(200).json(pet);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  '/:id' ,
  validateBody(Joi.object().keys({
    name: Joi.string().optional().description('Pet name'),
    age: Joi.number().integer().optional().description('Pet age'),
    colour: Joi.string().optional().description('Pet colour'),
  })),
  async (req, res, next) => {
    try {
      let pet;
      let updatePet = await Pet.findOneAndUpdate( { _id: req.params.id }, req.body );
      if( updatePet ) {
        pet = await Pet.findOne({ _id: req.params.id });
      }
      res.status(200).json(pet);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/:id' ,
  async (req, res, next) => {
    try {
      await Pet.deleteOne({ _id: req.params.id });
      res.status(200).json("deleted");
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;