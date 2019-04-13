const Joi = require('joi');

module.exports = {
    adminSchema: Joi.object({
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().alphanum().min(6).required(),
        fname: Joi.string().min(3).max(20).required(),
        lname: Joi.string().min(3).max(20).required(),
        email: Joi.string().email()
    }).unknown(),

    eventSchema: Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(10).required(),
        price: Joi.number().integer().required(),
        city: Joi.string(),
        location: Joi.string().required(),
        eventDate: Joi.required(),
        remainingPlaces: Joi.number().integer().required(),
        eventType: Joi.string().min(3),
	    speakers: Joi.array().sparse().items(Joi.string()),
	    topics: Joi.array().sparse().items(Joi.string())
    }).unknown(),

    memberSchema: Joi.object({
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().alphanum().min(6).required(),
        fname: Joi.string().min(3).max(20).required(),
        lname: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        address: Joi.string().alphanum().required()
    }).unknown(),

    partnerSchema: Joi.object({
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().alphanum().min(6).required(),
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        workfield: Joi.string().required()
    }).unknown(),

    vacancySchema: Joi.object({
        description:  Joi.string().min(10).required(),
        duration:  Joi.string().min(3).required(),
        location: Joi.string().required(),
        city: Joi.string().required(),
        salary: Joi.number().integer().required(),
        dailyHours: Joi.number().integer(),
        name: Joi.string().required()
    }).unknown()
};