const SubCategory = require('../models/SubCategory');
const base = require('../services/base');

let index = async (req , res , next ) => {
      let result = await SubCategory.find();
      if (result.length > 0) {
            base.fmsg(res , result , "Fetched all sub-categories . . ");
      }
      else {
            base.fmsg(res , [] , "No sub-category is on record");
      }
}

let store = async (req , res , next) => {
      let existCat = await SubCategory.findOne({name : req.body.name});

      if (!existCat) {
            let result = new SubCategory();
            result.name = req.body.name;
            result.slug = base.createSlug(req.body.name);
            await result.save();
            base.fmsg(res , result , 'Created sub category');
      } else {
            next(new Error('Sub category already exists'));
      }
}

let show = async (req , res , next) => {
      let result = await SubCategory.findOne({slug : req.params.slug});
      if (result) {
            base.fmsg(res , result , `${result.name} found. . .`);
      } else {
            next(new Error('No sub category found'));
      }
}

let patch = async (req , res , next ) => {
      let existData = await SubCategory.findOne({slug : req.params.slug});
      if (existData) {
            let result = await SubCategory.findOneAndUpdate(
                  {slug : req.params.slug},
                  {
                        name : req.body.name,
                        slug : base.createSlug(req.body.name)
                  }
            );

            base.fmsg(res , result , `updated successfully`);
      } else {
            next(new Error('sub category not found'));
      }
}

let drop = async (req , res , next) => {
      let existData = await SubCategory.findOne({slug : req.params.slug});
      if (existData) {
            await SubCategory.deleteOne({slug : req.params.slug});
            base.fmsg(res , {} , "deleted");
      } else {
            next(new Error('No sub category found...'));
      }
}

module.exports = {
      index,
      store,
      show,
      patch,
      drop
}