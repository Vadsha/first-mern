const Joi = require('joi');

module.exports = {

      CommonSchema : {
            param : Joi.object({
                  slug : Joi.string().regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
            })
      },

      CategorySchema : {
            add : Joi.object({
                  name : Joi.string().required(),
            }),
            patch : Joi.object({
                  name : Joi.string().required(),
                  // slug : Joi.string().regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
            })
      },

      SubCategorySchema : {
            add : Joi.object({
                  name : Joi.string().required(),
                  category : Joi.required(),
            }),
            patch : Joi.object({
                  name : Joi.string().required(),
                  category : Joi.required(),
                  // slug : Joi.string().regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
            })
      },

      ChildCategorySchema : {
            add : Joi.object({
                  name : Joi.string().required(),
                  sub_category : Joi.required(),
            }),
            patch : Joi.object({
                  name : Joi.string().required(),
                  sub_category : Joi.required(),
                  // slug : Joi.string().regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
            })
      },

      TagSchema : {
            add : Joi.object({
                  name : Joi.string().required(),
            }),
            patch : Joi.object({
                  name : Joi.string().required(),
                  // slug : Joi.string().regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
            })
      },
}