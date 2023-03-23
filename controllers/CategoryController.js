const Category = require('../models/Category');
const base = require('../services/base');

let index = async (req , res , next ) => {
      let result = await Category.find();
      if (result.length > 0) {
            base.fmsg(res , result , "Fetched all Categories . . ");
      }
      else {
            base.fmsg(res , [] , "No category is on record");
      }
}

let store = async (req , res , next) => {
      let existCat = await Category.findOne({name : req.body.name});

      if (!existCat) {
            let result = new Category();
            result.name = req.body.name;
            result.slug = base.createSlug(req.body.name);
            await result.save();
            base.fmsg(res , result , 'Created category');
      } else {
            next(new Error('Category already exists'));
      }
}

let show = async (req , res , next) => {
      let result = await Category.findOne({slug : req.params.slug});
      if (result) {
            base.fmsg(res , result , `${result.name} found. . .`);
      } else {
            next(new Error('No category found'));
      }
}

let patch = async (req , res , next ) => {
      let existData = await Category.findOne({slug : req.params.slug});
      if (existData) {
            let result = await Category.findOneAndUpdate(
                  {slug : req.params.slug},
                  {
                        name : req.body.name,
                        slug : base.createSlug(req.body.name)
                  }
            );

            base.fmsg(res , result , `updated successfully`);
      } else {
            next(new Error('category not found'));
      }
}

let drop = async (req , res , next) => {
      let existData = await Category.findOne({slug : req.params.slug});
      if (existData) {
            await Category.deleteOne({slug : req.params.slug});
            base.fmsg(res , {} , "deleted");
      } else {
            next(new Error('No category found...'));
      }
}

module.exports = {
      index,
      store,
      show,
      patch,
      drop
}